import { Mark } from 'tiptap'

export default class CodeField extends Mark {
  get name() {
    return 'code_field'
  }

  get schema() {
    return {
      excludes: '_',
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code', 0]
    }
  }

  commands({ type, schema }) {
    return attrs => async (state, dispatch) => {
      const { content } = attrs
      const { from, to } = state.selection
      const node = type.create({})
      const transaction = state.tr
      transaction.insertText(content, from, to)
      const newTo = to + content.length
      transaction.addMark(from, newTo, node)
      transaction.insertText(' ', newTo, newTo + 1)
      dispatch(transaction)
    }
  }
}

// inputRules({ type }) {
//     return [
//       markInputRule(/(?:`)([^`]+)(?:`)$/, type),
//     ]
//   }

//   pasteRules({ type }) {
//     return [
//       markPasteRule(/(?:`)([^`]+)(?:`)/g, type),
//     ]
//   }
