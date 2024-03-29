# frozen_string_literal: true

require 'google/apis/gmail_v1'

class Email < ApplicationRecord
  belongs_to :person

  enum status: { draft: 0, delivered: 1, opened: 2, clicked: 3 }

  after_commit :create_or_update_draft!, on: [:create, :update]

  cattr_accessor :gmail_client do
    Google::Apis::GmailV1::GmailService.new.tap do |gmail|
      authorization = Google::Auth::DefaultCredentials.make_creds(
        scope: ['https://mail.google.com'],
        json_key_io: StringIO.new(ENV['GOOGLE_CLOUD_CREDENTIALS']),
      )
      authorization.sub = ENV['DRAFT_OWNER']
      gmail.authorization = authorization
    end
  end

  def self.address(first_name, last_name, email)
    "'#{first_name} #{last_name}' <#{email}>"
  end

  def subject
    "#{person.first_name}: Yasyf's 25th Birthday (01/31 - 02/02)"
  end

  def to_markdown
    [
      "### Hey #{person.first_name}!",
      "This year for my birthday, I'm trying something a little different.",
      " Instead of throwing a big party with a ton of people (although we might still do that)," \
      " I'm bringing together a small group of my closest friends for an intimate gathering on the weekend of Feb 1st.",
      "I'd love for you to join me!",
      "**You can find all the details [here](#{tracked_link}) (best viewed on desktop).**",
      "Cheers,",
      "Yasyf",
      "![](#{tracked_image})"
    ].join("\n\n")
  end

  def to_html(**kwargs)
    Kramdown::Document.new(to_markdown(**kwargs)).to_html.html_safe # rubocop:disable Rails/OutputSafety
  end

  def to_email
    Mail.new(
      subject: subject,
      to: self.class.address(person.first_name, person.last_name, person.email_address),
      from: self.class.address('Yasyf', 'Mohamedali', ENV['DRAFT_OWNER']),
    ).tap do |m|
      m.text_part = Mail::Part.new(body: to_markdown)
      m.html_part = Mail::Part.new(content_type: 'text/html; charset=UTF-8', body: to_html)
      m.attachments[attachment_name] = { mime_type: 'text/calendar;method=REQUEST', content: Base64.encode64(attachment_body), encoding: 'base64' }
    end
  end

  def create_or_update_draft!
    return unless draft?
    if draft_id.present?
      begin
        update_draft!
      rescue Google::Apis::ClientError
        create_draft!
      end
    else
      create_draft!
    end
  end

  def send!
    update! status: :delivered
    send_draft!
  end

  private

  def attachment_name
    "Yasyf_25th_Birthday.ics"
  end

  def attachment_body
    <<~ICAL
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//ical.marudot.com//iCal Event Maker
      BEGIN:VEVENT
      DTSTAMP:20191201T114957Z
      UID:20191201T114957Z-401153972@marudot.com
      DTSTART;VALUE=DATE:20200131
      DTEND;VALUE=DATE:20200203
      SUMMARY:Yasyf's 25th Birthday
      URL:#{CGI.escape(tracked_link)}
      ORGANIZER:MAILTO:#{ENV['DRAFT_OWNER']}
      DESCRIPTION:Join me for a weekend in Hawaii of fun\, food\, and friends!\\n\\nFull details here: #{tracked_link}
      LOCATION:Honolulu\, Hawaii
      END:VEVENT
      END:VCALENDAR
    ICAL
  end

  def tracked_link
    Rails.application.routes.url_helpers.invite_link_person_url(id: person_id)
  end

  def tracked_image
    Rails.application.routes.url_helpers.invite_image_person_url(id: person_id)
  end

  def send_draft!
    return if draft?
    return if draft_id.blank?
    return if message_id.present?

    message = gmail_client.send_user_draft(
      ENV['DRAFT_OWNER'],
      Google::Apis::GmailV1::Draft.new(id: draft_id),
    )
    update! message_id: message.id
  end

  def create_draft!
    draft = gmail_client.create_user_draft(
      ENV['DRAFT_OWNER'],
      upload_source: StringIO.new(to_email.to_s),
      content_type: 'message/rfc822',
    )
    update! draft_id: draft.id
  end

  def update_draft!
    gmail_client.update_user_draft(
      ENV['DRAFT_OWNER'],
      draft_id,
      upload_source: StringIO.new(to_email.to_s),
      content_type: 'message/rfc822',
    )
  end
end
