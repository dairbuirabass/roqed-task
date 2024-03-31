<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return File::orderBy('id', 'DESC')->paginate(50);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request @request
     * return
     */
    public function store(Request $request)
    {
        /** @var UploadedFile $file */
        $file = $request->file;
        $fileTitle = $request->title;

        if (!isset($fileTitle)) {
            $fileTitle = $file->getClientOriginalName();
        }

        $fileSize = $file->getSize();
        $fileExtension = $file->getClientOriginalExtension();
        $path = $file->store('files', 'public');

        $thumbnailPath = null;
        if(substr($file->getMimeType(), 0, 5) == 'image') {
            $thumbnailPath = $this->generateThumbnail($file);
        }

        File::create([
            'title' => $fileTitle,
            'size' => (int) $fileSize,
            'extension' => $fileExtension,
            'path' => $path,
            'thumbnailPath' => $thumbnailPath
        ]);

        return response()->json(['success'=>'You have successfully uploaded a file.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $entryId)
    {
        return File::find($entryId);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $entryId)
    {
        $entry = File::find($entryId);

        if ($request->title) {
            $entry->title = $request->title;
        }

        if ($request->file) {
            Storage::delete('public/' . $entry->path);
            if ($entry->thumbnailPath) {
                Storage::delete('public/' . $entry->thumbnailPath);
            }

            /** @var UploadedFile $file */
            $file = $request->file;
            $entry->size = $file->getSize();
            $entry->extension = $file->getClientOriginalExtension();
            $entry->path = $file->store('files', 'public');

            if(substr($file->getMimeType(), 0, 5) == 'image') {
                $thumbnailPath = $this->generateThumbnail($file);
                $entry->thumbnailPath = $thumbnailPath;
            }
        }

        $entry->save();

        return response()->json(['success'=>'You have successfully uploaded a file.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $entryId)
    {
        $entry = File::find($entryId);

        Storage::delete($entry->path);

        return $entry->delete();;
    }

    private function generateThumbnail($file)
    {
        $manager = new ImageManager(new Driver());
        $generatedName = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
        $image = $manager->read($file);

        $image = $image->resize(100, 100);
        $encoded = $image->encodeByMediaType('image/jpeg');
        // TO DO improve storing of the thumbnail with Laravel logic

        $path = 'thumbnails/' . $generatedName;

        $uploaded = Storage::put('public/' . $path, $encoded);
        if ($uploaded) {
            return $path;
        }
    }
}
