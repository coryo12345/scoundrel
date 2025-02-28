<template>
  <div class="relative">
    <RouterLink
      :to="{ name: 'home' }"
      class="absolute top-0 right-0 cursor-pointer bg-gray-600 text-white rounded-full flex justify-center items-center font-bold w-8 h-8"
      title="Go Back"
    >
      X
    </RouterLink>

    <div class="mx-auto text-white py-8 flex flex-col">
      <h1 class="text-4xl font-semibold text-center font-[Teko] text-yellow-400">Scoundrel</h1>
      <p class="text-center text-gray-200 mt-1">A card-based dungeon-crawling game.</p>

      <section class="mt-6">
        <h2 class="text-3xl font-medium font-[Teko] text-blue-300">About</h2>
        <p class="mt-1">
          Scoundrel is played with a standard deck of playing cards, excluding jokers, red face
          cards, and red aces.
        </p>
        <p class="mt-2">
          The goal of the game is to get through the whole deck of cards, while keeping your
          <span class="font-[Teko] text-xl text-green-500">health</span> above
          <span class="font-[Teko] text-xl text-red-400">zero</span>.
        </p>
      </section>

      <section class="mt-6">
        <h2 class="text-3xl font-medium font-[Teko] text-green-400">Gameplay</h2>
        <p class="mt-2">
          When you begin the game, you are presented with four cards. This is the first room in the
          dungeon.
        </p>
        <p class="mt-2">
          Tapping one of the cards will use that card as an action. You can read what each card does
          below. Some heal you, some deal damage to you, and some protect you.
        </p>
        <p class="mt-2">
          Whenever the room gets down to only one card remaining, three more will be dealt, this is
          a new room.
        </p>
        <p class="mt-2">
          At the start of a room, you can choose to run instead of dealing with its cards. This will
          put all four cards at the bottom of the draw pile. But be careful! You can't run twice in
          a row!
        </p>
        <p class="mt-2">
          If your health reaches zero, you lose. If you use all the cards in the deck and have
          health remaining, you win!
        </p>
      </section>

      <section class="mt-6">
        <h2 class="text-3xl font-medium text-red-400 font-[Teko]">Cards</h2>
        <ul class="space-y-4">
          <li class="p-4 rounded-lg">
            <span class="font-medium font-[Teko] text-2xl text-green-300">Monsters:</span> The 26
            Clubs and Spades in the deck. Their damage equals their value (e.g., 10 is 10, Jack is
            11, Queen is 12, King is 13, and Aces are 14).
          </li>
          <li class="p-4 rounded-lg">
            <span class="font-medium font-[Teko] text-2xl text-pink-400">Health Potions:</span> The
            Hearts 2-10. Drinking a potion heals you it's value. Health cannot exceed the starting
            20.
          </li>
          <li class="p-4 rounded-lg">
            <span class="font-medium font-[Teko] text-2xl text-yellow-300">Weapons:</span> The
            Diamonds 2-10. Each protects you from damage equal to its value when fighting a monster.
            (Fighting an 8 with the 4 of diamonds will do only 4 damage to you. Fighting an 8 with
            the 10 of diamonds will do 0 damage to you). <br /><br />
            Be careful what order you fight monsters in with your weapon! If you fight an 8, the
            next monster must <strong class="font-semibold">lower</strong> than 8 (7 or below).
            <br /><br />
            <strong class="font-semibold">Weapons are binding</strong> — when you equip a new one
            you must discard the old.
          </li>
        </ul>
      </section>

      <section class="mt-6">
        <h2 class="text-3xl font-medium text-purple-400 font-[Teko]">Merchants (Optional)</h2>
        <p class="mt-2">
          When starting a new game, you have the option to add merchants (Red Jacks) to the deck.
        </p>
        <p class="mt-2">
          When tapping a merchant, you will have the option to sell your currently equipped weapon
          in exchange for health. If you have no weapon (or simply choose not to sell) - you can
          pass, and the merchant will be discarded.
        </p>
        <p class="mt-2">
          If you have not fought any monsters with your current weapon, you gain health equal to
          your weapon's value when selling. If you have fought a monster, you gain health equal to
          the value of the last monster you fought it with.
        </p>
      </section>

      <RouterLink :to="{ name: 'home' }" class="btn mt-8"> Go Back </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
