import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { colors, typography } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'

const UploadGuidelines = () => {
  const navigation = useNavigation()

  return (
    <ScrollView
      style={globalStyle.flex}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.text, styles.header]}>
        Ready to start meeting people on Honeypages.com? Uploading your picture
        is the single best way to get responses from other Honeypages.com users.
        We encourage you to show off your sexy self, but please follow these
        guidelines:
      </Text>
      <View style={styles.listInfo}>
        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>Only Pictures of YOU</Text> - post only
            authentic content, pictures or photos of YOU. Do NOT post images of
            other people without their permission.
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>No Minors</Text> - Please do not post
            photos, videos, or any content of minors.
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>No Nudity</Text> - We do not allow nudity
            or sexually explicit images. This includes photos and videos with
            content displaying sexual intercourse, genitals, and close-ups.
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>Keep it Legal</Text> - Do NOT post content
            supporting or praising hate groups, terrorism, or criminal activity.
            Do NOT solicit nor offer sexual services, firearms or drugs. Do NOT
            post content promoting drug use, this will result in a warning and
            ultimately a ban from accessing our site.
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>No Inappropriate Content</Text> - Media
            showing violence, offensive acts, lewd depictions is NOT allowed.
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>Avoid Texts in Images</Text> Do NOT post
            content that contains usernames or numbers that link to other
            accounts (ex. Phone numbers, email addresses, Cashapp / Venmo tags
            etc.)
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.point}>{'\u2022'}</Text>
          <Text style={[styles.text, styles.header]}>
            <Text style={styles.bold}>Report Suspicious Activity</Text> If you
            see something that you think may violate our guidelines, please
            report it. Our team reviews everything and will act swiftly. We may
            remove entire posts or even delete accounts if any of the guidelines
            are in violation.
          </Text>
        </View>
      </View>

      <Text style={[styles.text, styles.header]}>
        For more information, check out the{' '}
        <Text
          style={styles.terms}
          onPress={() => navigation.navigate('TermsOfServiceScreen')}
        >
          Privacy and Terms of Use
        </Text>{' '}
        section.
      </Text>
      <Text style={[styles.text, styles.header]}>
        The Honeypages Team thanks you!
      </Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    // alignItems: 'center',
  },
  text: {
    ...typography.p2,
    color: colors.textMain,
  },
  header: {
    marginBottom: 16,
  },
  bold: {
    fontWeight: '600',
  },
  listInfo: {
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  point: {
    fontSize: 20,
    color: colors.textMain,
    marginRight: 5,
  },
  terms: {
    textDecorationLine: 'underline',
  },
})

export default UploadGuidelines
