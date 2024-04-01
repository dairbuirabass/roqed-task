<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://roqed.com/wp-content/uploads/2021/03/Webp.net-resizeimage-11.png" class="h-8"
          alt="ROQED Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Test Task</span>
      </a>
      <div class="w-full max-w-screen-lg md:block md:w-auto">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <RouterLink :to="{ name: 'form' }">
                Create new entry
              </RouterLink>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
