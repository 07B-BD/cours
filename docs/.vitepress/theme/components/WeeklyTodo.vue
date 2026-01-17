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
        <h2 class="text-2xl font-semibold tracking-tight" style="color: var(--vp-c-text-1)">
          {{ title }}
        </h2>

        <p v-if="subtitle" class="mt-1 text-sm" style="color: var(--vp-c-text-2)">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="mt-3 space-y-3">
      <div
        v-for="(s, i) in steps"
        :key="i"
        class="group rounded-2xl border p-4 shadow-sm
               transition-all duration-200 ease-out
               hover:-translate-y-0.5 hover:shadow-md"
        style="
          border-color: var(--vp-c-divider);
          background: var(--vp-c-bg-soft);
          color: var(--vp-c-text-1);
        "
      >
        <div class="flex items-start gap-4">
          <!-- Numéro -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                   transition-transform duration-200 group-hover:scale-105"
            style="background: var(--vp-c-brand-1); color: var(--vp-c-bg)"
          >
            <span class="text-sm font-semibold">{{ i + 1 }}</span>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-semibold leading-6" style="color: var(--vp-c-text-1)">
                {{ s.title }}
              </h3>

              <span
                v-if="s.badge"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                       transition group-hover:brightness-105"
                style="
                  background: var(--vp-c-bg);
                  color: var(--vp-c-text-2);
                  border: 1px solid var(--vp-c-divider);
                "
              >
                {{ s.badge }}
              </span>

              <span
                v-if="s.time"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                       transition group-hover:brightness-105"
                style="
                  background: var(--vp-c-bg);
                  color: var(--vp-c-text-2);
                  border: 1px solid var(--vp-c-divider);
                "
              >
                ⏱ {{ s.time }}
              </span>
            </div>

            <p v-if="s.description" class="mt-1 text-sm" style="color: var(--vp-c-text-2)">
              {{ s.description }}
            </p>

            <div class="mt-3 flex flex-wrap gap-2">
              <a
                v-for="(l, j) in s.links"
                :key="j"
                :href="withBase(l.href)"
                class="
                  inline-flex items-center justify-center gap-1
                  rounded-xl px-3 py-2 text-sm font-medium
                  no-underline!
                  transition-all duration-150 ease-out
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  active:scale-[0.97]
                "
                :style="
                  l.variant === 'secondary'
                    ? {
                        border: '1px solid var(--vp-c-divider)',
                        background: 'var(--vp-c-bg)',
                        color: 'var(--vp-c-text-1)',
                        boxShadow: 'none'
                      }
                    : {
                        background: 'var(--vp-c-brand-1)',
                        color: 'var(--vp-c-bg)',
                        boxShadow: '0 1px 2px rgba(0,0,0,.12)'
                      }
                "
                @mouseover="
                  ($event.currentTarget as HTMLElement).style.filter = 'brightness(1.05)'
                "
                @mouseout="
                  ($event.currentTarget as HTMLElement).style.filter = 'none'
                "
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

