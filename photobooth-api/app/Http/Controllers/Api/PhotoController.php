<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\PhotoboothMail;
use App\Models\EmailLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'image' => ['required', 'string'],
        ]);

        try {

            $image = $request->image;

            $image = preg_replace(
                '/^data:image\/\w+;base64,/',
                '',
                $image
            );

            $image = str_replace(' ', '+', $image);

            $fileName = 'photobooth_' . time() . '.png';

            $filePath = 'photobooth/' . $fileName;

            Storage::disk('public')->put(
                $filePath,
                base64_decode($image)
            );

            Mail::to($request->email)
                ->send(new PhotoboothMail($filePath));

            EmailLog::create([
                'email' => $request->email,
                'file_name' => $fileName,
                'status' => 'success',
                'message' => 'Photo sent successfully',
            ]);

            return response()->json([
                'success' => true,
                'file' => $fileName,
            ]);
        } catch (\Exception $e) {

            EmailLog::create([
                'email' => $request->email,
                'status' => 'failed',
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
