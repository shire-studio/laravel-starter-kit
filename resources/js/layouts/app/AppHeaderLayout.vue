<script setup lang="ts">
import type { BreadcrumbItem } from '@/types'

type Props = {
  breadcrumbs?: BreadcrumbItem[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
})
</script>

<template>
  <AppShell variant="header">
    <AppHeader :breadcrumbs="breadcrumbs" />
    <AppContent variant="header">
      <slot />
    </AppContent>
    <UiToaster />
  </AppShell>
</template>
