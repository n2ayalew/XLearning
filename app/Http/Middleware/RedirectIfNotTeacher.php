<?php

namespace App\Http\Middleware;

use Closure;

class RedirectIfNotTeacher
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->user()->isTeacher()){
            return $next($request);
        }

        return redirect('student/' . $request->path());
    }
}
