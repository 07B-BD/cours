<script setup lang="ts">
import { withBase } from "vitepress";

type Link = { text: string; href: string; variant?: "primary" | "secondary" };
type Step = {
  title: string;
  description?: string;
  time?: string;
  badge?: string;
  links: Link[];
};

const props = defineProps<{
  title?: string;
  subtitle?: string;
  steps: Step[];
}>();

const title = props.title ?? "À faire cette semaine";
</script>

<template>
  <section>
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">{{ title }}</h2>
        <p v-if="subtitle" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="mt-3 space-y-3">
      <div
        v-for="(s, i) in steps"
        :key="i"
        class="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm
               dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="flex items-start gap-4">
          <!-- Numéro -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                   bg-gray-800 text-white dark:bg-white dark:text-gray-900"
          >
            <span class="text-sm font-semibold">{{ i + 1 }}</span>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-semibold leading-6">
                {{ s.title }}
              </h3>

              <span
                v-if="s.badge"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                       bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200"
              >
                {{ s.badge }}
              </span>

              <span
                v-if="s.time"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                       bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                ⏱ {{ s.time }}
              </span>
            </div>

            <p
              v-if="s.description"
              class="mt-1 text-sm text-gray-600 dark:text-gray-300"
            >
              {{ s.description }}
            </p>

            <div class="mt-3 flex flex-wrap gap-2">
              <a
                v-for="(l, j) in s.links"
                :key="j"
                :href="withBase(l.href)"
                class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium
                       transition"
                :class="l.variant === 'secondary'
                  ? 'border border-gray-200 bg-white text-gray-900! no-underline! hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
                  : 'bg-green-600 text-white! no-underline! hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'"
              >
                {{ l.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
