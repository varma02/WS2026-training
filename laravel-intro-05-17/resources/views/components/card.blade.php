<li class="card bg-base-100 shadow-sm ">
    <figure>
        <object data="{{ $car->image }}" type="image/png">
            <img src="https://http.cat/404" alt="" />
        </object>
    </figure>
    <div class="card-body bg-transparent backdrop:bg-transparent">
        <h2 class="card-title">{{ $car->title }}</h2>
        {{-- <p>{{$car.}}</p> --}}
    </div>
</li>
