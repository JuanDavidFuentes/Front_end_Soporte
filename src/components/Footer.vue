<template>
  <v-footer color="#000000" app padless>
    <v-row justify="center" no-gutters>
      <v-col class=" py-4 text-center white--text" cols="12">
        <strong>Soporte</strong> - {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: 'PageFooter',
  data: () => ({

  }),
}
</script>