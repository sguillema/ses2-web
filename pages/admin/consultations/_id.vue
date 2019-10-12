<template>
  <attendance-key-generator />
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import AttendanceKeyGenerator from '../../../components/AttedanceKeyGenerator/AttendanceKeyGenerator'

export default {
  components: { AttendanceKeyGenerator },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
