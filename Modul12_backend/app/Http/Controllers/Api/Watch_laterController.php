<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\watch_later;
use App\Models\Contents;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class Watch_laterController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $watch_laterVideos = watch_later::where('id_user', $user->id)
            ->with('content')
            ->get();

        return response([
            'message' => 'Watch Later videos retrieved successfully',
            'data' => $watch_laterVideos
        ], 200);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'content_id' => 'required|exists:contents,id', 
        ]);

        if ($validate->fails()) {
            return response([
                'message' => $validate->errors(),
            ], 400);
        }

        $user = Auth::user();

        $watch_later = watch_later::create([
            'id_user' => $user->id,
            'id_content' => $request->content_id,
            'date_added' => now(),
        ]);

        $logMessage = "User " . $user->id . " added content " . $request->content_id . " to Watch Later on " . now() . "\n";
        Storage::disk('local')->append('watch_later_log.txt', $logMessage);

        return response([
            'message' => 'Video added to Watch Later successfully',
            'data' => $watch_later
        ], 200);
    }
    public function destroy($contentId)
    {
        $user = Auth::user();

        $watch_later = watch_later::where('id_user', $user->id)
            ->where('id_content', $contentId)
            ->first();

        if ($watch_later) {
            $watch_later->delete();

            $logMessage = "User " . $user->id . " removed content " . $contentId . " from Watch Later on " . now() . "\n";
            Storage::disk('local')->append('watch_later_log.txt', $logMessage);

            return response([
                'message' => 'Video removed from Watch Later successfully',
                'data' => $watch_later
            ], 200);
        } else {
            return response([
                'message' => 'Video not found in Watch Later',
                'data' => null
            ], 404);
        }
    }
}
