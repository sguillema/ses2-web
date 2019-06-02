<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>Frequently Asked Questions</h1>
      <Sheet class="sheet">
        <div v-for="(section, index) in sections" :key="index">
          <h2>{{ section.heading }}</h2>
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(question, questionIndex) in section.questions"
              :key="questionIndex"
            >
              <template v-slot:header>
                <div>
                  <b>{{ question.question }}</b>
                </div>
              </template>
              <v-card>
                <v-card-text v-html="question.answer" />
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
      </Sheet>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import Sheet from '~/components/Sheet/Sheet'

export default {
  middleware: studentAuthenticated,
  layout: 'student',
  components: { Sheet },
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      sections: [
        {
          heading: 'About the HELPS Programs',
          questions: [
            {
              question: 'Who can use Helps?',
              answer:
                'Any student  enrolled in any faculty of Univesity of Technology Sydney'
            },
            {
              question: 'Where is HELPS?',
              answer: 'HELPS is located on Building 1, Level 5, room 25'
            },
            {
              question: 'How much does it cost?',
              answer:
                'Services are free of tution fees for non-credit workshops and individual consultations.'
            },
            {
              question: 'Can you help me with my assignment?',
              answer:
                'Yes. HELPS offers various workshops and individual consultations. For more information, check out our <a href="https://www.uts.edu.au/current-students/support/helps">website</a>.'
            },
            {
              question: 'Can you proofread and correct my assignment?',
              answer:
                'No. Our role is not to correct grammar or other errors in an assignment. We can help you develop your own editing strategies. You should also use a computer spell-check, find a competent friend and a good dictionary.'
            },
            {
              question: 'Can you help me with the content of my assignment?',
              answer:
                'No. We can’t tell you what to say, we can only help you say it better and more clearly. While we’re happy to act as a sounding board for your ideas, content questions require the specialised disciplinary knowledge of lecturers and tutors in your faculty. You should take specific content questions directly to them.'
            },
            {
              question:
                'My lecturer says I need to improve my grammar. Can you help me?',
              answer:
                ' Yes. Please check our website for information on our <a href="https://www.uts.edu.au/current-students/support/helps/daily-workshops">workshops</a> and <a href = "https://www.uts.edu.au/current-students/support/helps/daily-workshops" >Learning resources</a>.'
            },
            {
              question: 'Can you help me with my pronunciation?',
              answer:
                ' Yes. Please check our website for information on our <a href="https://www.uts.edu.au/current-students/support/helps/english-speaking">English speaking programs</a>,<a href ="https://www.uts.edu.au/current-students/support/helps/daily-workshops"> workshops </a> and <a href = "https://www.uts.edu.au/current-students/support/helps/daily-workshops" >Learning resources</a>.'
            },
            {
              question: 'Can I practise my seminar presentation with someone?',
              answer:
                ' Yes. You can attend our workshops or drop in for an individual consultation session.'
            }
          ]
        },
        {
          heading: 'About   the Special Conditions in Exams',
          questions: [
            {
              question:
                'I am not a native English speaker and I feel that I need more time in exams. Can you help?',
              answer:
                'Maybe. You might be eligible to apply for <a href="https://www.uts.edu.au/current-students/support/helps/special">Special Conditions in Exams</a>.'
            },
            {
              question: 'Where is HELPS?',
              answer: 'HELPS is located on Building 1, Level 5, room 25'
            },
            {
              question:
                'I am a second/third year student. Can I get Special Conditions in my exams?',
              answer:
                'No. Only first year (1st/2nd semester) students are eligible to apply.'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

h2 {
  margin: 0 0 18px;
  padding: 0px 0px 16px 30px;
  border-bottom: 1px solid $color-divider;
}

.v-expansion-panel {
  box-shadow: none;
  padding: 0 30px 30px;
}

.sheet {
  padding: 26px 36px;
}

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
