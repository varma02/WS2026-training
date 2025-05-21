<x-layout>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 place-items-center">
        @forelse ($cars as $car)
            <x-card :car="$car" />
        @empty
            <p>No cars found.</p>
        @endforelse
    </ul>
</x-layout>