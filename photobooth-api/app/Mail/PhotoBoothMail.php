<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;

class PhotoboothMail extends Mailable
{
    public string $filePath;

    public function __construct(string $filePath)
    {
        $this->filePath = $filePath;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Hasil Foto Photobooth'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.photobooth'
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromPath(
                storage_path('app/public/' . $this->filePath)
            )
                ->as('photobooth.png')
                ->withMime('image/png'),
        ];
    }
}
