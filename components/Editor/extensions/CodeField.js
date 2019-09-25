import { Mark } from 'tiptap'

export default class CodeField extends Mark {
  get name() {
    return 'code_field'
  }

  get schema() {
    return {}
  }

  commands({ type, schema }) {
    return attrs => async (state, dispatch) => {
      const { content } = attrs
      const { from, to } = state.selection
      const transaction = state.tr
      // const node = type.create({})
      // transaction.insertText(content, from, to)
      // const newTo = to + content.length
      // transaction.addMark(from, newTo, node)
      // transaction.insertText(' ', newTo, newTo + 1)
      let updatedFrom = from
      let updatedTo = to
      const startBlock = '$['
      const endBlock = ']'
      transaction.insertText(startBlock, updatedFrom, updatedTo)
      updatedFrom += startBlock.length
      updatedTo += startBlock.length
      transaction.insertText(content, updatedFrom, updatedTo)
      updatedTo += content.length
      updatedFrom = updatedTo
      transaction.insertText(endBlock, updatedFrom, updatedTo)
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
