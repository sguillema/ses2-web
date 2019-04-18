<template>
  <div id="page-styleguide">
    <section class="section-container">
      <div class="container">
        <div class="reee">{{ reee }}</div>
        <h1>{{ heading }}</h1>
        <h2>{{ subheading }}</h2>
        <p>{{ paragraph }}</p>
        <a href="#">{{ linkText }}</a>
        <v-btn depressed color="primary">
          primary
        </v-btn>
        <v-btn depressed>
          secondary
        </v-btn>
        <v-btn depressed disabled>
          disabled
        </v-btn>
        <v-text-field label="Outline" placeholder="Placeholder" outline />
        <v-select :items="selectItems" label="Dropdown Select" outline />
        <v-text-field
          outline
          label="Username"
          prepend-inner-icon="account_box"
        />
        <v-text-field
          v-model="passwordData.password"
          outline
          prepend-inner-icon="lock"
          :append-icon="
            passwordData.showPassword ? 'visibility' : 'visibility_off'
          "
          :rules="[passwordData.rules.required, passwordData.rules.min]"
          :type="passwordData.showPassword ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="passwordData.showPassword = !passwordData.showPassword"
        />
        <v-checkbox
          v-model="checkboxData.checkbox"
          :label="`Checkbox 1: ${checkboxData.checkbox.toString()}`"
        />
        <v-radio-group v-model="radioGroup" column>
          <v-radio label="Option 1" value="radio-1" />
          <v-radio label="Option 2" value="radio-2" />
        </v-radio-group>
        <v-chip close @input="remove(chipData.course)">
          <strong>{{ chipData.course }}</strong>
          &nbsp;
          <span>({{ chipData.mark }})</span>
        </v-chip>
      </div>
    </section>
  </div>
</template>

<script>
import { unauthenticated } from '../middleware/authenticatedRoutes'

export default {
  middleware: unauthenticated,

  data() {
    return {
      selectItems: ['helooo', 'world', 'this is', 'me'],
      reee: '48px reeeeeee bold',
      heading: '24px heading 1 medium',
      subheading: '20px heading 2 medium',
      paragraph: '14px paragraph regular',
      linkText: 'link to new tab',
      passwordData: {
        password: '',
        showPassword: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        }
      },
      checkboxData: {
        checkbox: false
      },
      radioGroup: null,
      chipData: {
        course: 'HSC',
        mark: '99.95'
      }
    }
  },

  methods: {
    remove(course) {
      console.log(`delete course ${course} here`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
