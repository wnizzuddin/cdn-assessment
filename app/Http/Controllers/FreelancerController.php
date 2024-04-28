<?php

namespace App\Http\Controllers;

use App\Models\Freelancer;
use Illuminate\Http\Request;

class FreelancerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Freelancer::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        $freelancer = new Freelancer();
        $freelancer->username = $request->username;
        $freelancer->mail = $request->mail;
        $freelancer->phoneNo = $request->phoneNo;
        $freelancer->skillsets = $request->skillsets;
        $freelancer->hobby = $request->hobby;
        $freelancer->save();
        return Freelancer::all();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $freelancer = Freelancer::find($id);
        $freelancer->username = $request->username;
        $freelancer->mail = $request->mail;
        $freelancer->phoneNo = $request->phoneNo;
        $freelancer->skillsets = $request->skillsets;
        $freelancer->hobby = $request->hobby;
        $freelancer->update();
        return Freelancer::all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Freelancer $id)
    {
        //
        $id->delete();
        return Freelancer::all();
    }
}