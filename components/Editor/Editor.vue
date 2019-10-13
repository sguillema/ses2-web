<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon>format_bold</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon>format_italic</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon>strikethrough_s</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon>format_underline</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon>format_list_bulleted</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon>format_list_numbered</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon>format_quote</v-icon>
        </button>

        <button @click="commands.undo">
          <v-icon>undo</v-icon>
        </button>

        <button @click="commands.redo">
          <v-icon>redo</v-icon>
        </button>

        <button
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          Paragraph
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          Heading 1
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          Heading 2
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          Heading 3
        </button>

        <v-select
          v-model="selected"
          :items="fieldData"
          dense
          height="24"
          placeholder="Insert field..."
          class="field-select"
          @change="e => onFieldSelect(e, commands.code_field)"
        />
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Code
} from 'tiptap-extensions'
import { CodeField } from './extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    value: { type: String, required: true },
    fieldData: { type: Array, default: () => [] }
  },
  data() {
    return {
      editor: null,
      selected: null,
      currentHTML: null
    }
  },
  watch: {
    value(val) {
      // so cursor doesn't jump to start on typing
      if (this.editor && val !== this.currentHTML) {
        this.editor.setContent(val, true)
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new CodeField(),
        new Code()
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        const html = getHTML()
        this.currentHTML = html
        this.$emit('input', html)
      },
      onTransaction: ({ state }) => {
        const { anchor, from, to } = state.selection
        // console.log(anchor, from, to)
        // console.log(state.selection)
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    onFieldSelect(e, command) {
      command({ content: e })
      this.$nextTick(() => (this.selected = null))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

$button-height: 24px;

.editor {
  border: 2px solid $color-divider;
}

.menubar {
  display: flex;
  align-items: center;
  background-color: $color-divider;
  padding: 5px;

  button {
    padding: 0px 6px;
    &.is-active {
      background-color: darken($color-divider, 20%);
      border-radius: 5px;
    }
    &:hover {
      .theme--light.v-icon {
        color: $color-black;
      }
    }
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>

<style>
.editor__content {
  padding: 6px 12px;
}
.editor__content .ProseMirror {
  outline: none;
}
.field-select.v-input {
  font-size: 14px;
  max-width: 300px;
}
.field-select.v-text-field {
  padding-top: 4px;
}
.field-select .v-input__slot {
  margin-bottom: 0;
}
</style>
