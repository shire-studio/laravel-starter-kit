<script setup lang="ts">
import { toUrl } from '@/lib/utils'
import { edit as editAppearance } from '@/routes/appearance'
import { edit as editSecurity } from '@/routes/password'
import { edit as editProfile } from '@/routes/user-profile'
import type { NavItem } from '@/types'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: editProfile(),
  },
  {
    title: 'Security',
    href: editSecurity(),
  },
  {
    title: 'Appearance',
    href: editAppearance(),
  },
]

const { isCurrentOrParentUrl } = useCurrentUrl()
</script>

<template>
  <div class="px-4 py-6">
    <Heading
      title="Settings"
      description="Manage your profile and account settings"
    />

    <div class="flex flex-col lg:flex-row lg:space-x-12">
      <aside class="w-full max-w-xl lg:w-48">
        <nav class="flex flex-col space-y-1 space-x-0" aria-label="Settings">
          <UiButton
            v-for="item in sidebarNavItems"
            :key="toUrl(item.href)"
            variant="ghost"
            :class="[
              'w-full justify-start',
              { 'bg-muted': isCurrentOrParentUrl(item.href) },
            ]"
            as-child
          >
            <Link :href="item.href">
              {{ item.title }}
            </Link>
          </UiButton>
        </nav>
      </aside>

      <UiSeparator class="my-6 lg:hidden" />

      <div class="flex-1 md:max-w-2xl">
        <section class="max-w-xl space-y-12">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>
