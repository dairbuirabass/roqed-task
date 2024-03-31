<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

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

        File::create([
            'title' => $fileTitle,
            'size' => (int) $fileSize,
            'extension' => $fileExtension,
            'path' => $path,
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
            /** @var UploadedFile $file */
            $file = $request->file;
            $entry->size = $file->getSize();
            $entry->extension = $file->getClientOriginalExtension();
            $entry->path = $file->store('files', 'public');
        }

        // TODO delete previous file

        $entry->save();

        return response()->json(['success'=>'You have successfully uploaded a file.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $entryId)
    {
        $entry = File::find($entryId);

        // TODO Delete file

        return $entry->delete();;
    }
}
