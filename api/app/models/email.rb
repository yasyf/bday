# frozen_string_literal: true

require 'google/apis/gmail_v1'

class Email < ApplicationRecord
  belongs_to :person

  enum status: { draft: 0, delivered: 1, opened: 2, clicked: 3 }

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

  def subject; end

  def to_markdown; end

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
