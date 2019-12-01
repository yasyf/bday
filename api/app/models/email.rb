# frozen_string_literal: true

require 'google/apis/gmail_v1'

class Email < ApplicationRecord
  belongs_to :person

  enum status: { draft: 0, delivered: 1, opened: 2, clicked: 3 }

  after_commit :save_or_send_draft!, on: [:create, :update]

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

  def subject
    "Yasyf's 25th Birthday"
  end

  def to_markdown
    [
      "### Hey #{person.first_name}!",
      "This year for my birthday, I'm trying something a little different." \
      " Instead of throwing a big party with a ton of people (although we might still do that)," \
      " I'm bringing together a small handful of my closest friends for an intimate gathering.",
      "I'd love for you to join me! You can find all the details [here](#{tracked_link}) (the site is best viewed on desktop).",
      "![](#{tracked_image})"
    ].join("\n\n")
  end

  def to_html(**kwargs)
    Kramdown::Document.new(to_markdown(**kwargs)).to_html.html_safe # rubocop:disable Rails/OutputSafety
  end

  def to_email
    mail.tap do |m|
      m.text_part = Mail::Part.new(body: to_markdown)
      m.html_part = Mail::Part.new(content_type: 'text/html; charset=UTF-8', body: to_html)
    end
  end

  def save_or_send_draft!
    if draft_id.present?
      begin
        update_draft!
      rescue Google::Apis::ClientError
        create_draft!
      end
    else
      create_draft!
    end
    send_draft!
  end

  private

  def tracked_link
    Rails.application.routes.url_helpers.tracking_link_person_url(person: person)
  end

  def tracked_image
    Rails.application.routes.url_helpers.tracking_image_person_url(person: person)
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

  def mail
    @mail ||= Mail.new(subject: title, to: ENV['DRAFT_TO'])
  end
end
