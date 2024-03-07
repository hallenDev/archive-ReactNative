import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { colors, text } from '~/ui/theme'

const TermsText = ({ children }) => (
  <Text style={styles.termsText}>{children}</Text>
)

const PrivacyPolicy = () => (
  <CustomScrollbar
    contentContainerStyle={styles.container}
    scrollEventThrottle={40}
  >
    <Text style={styles.termsTitle}>PRIVACY POLICY</Text>
    <Text style={styles.termsSubTitle}>
      THIS POLICY WAS LAST UPDATED ON April 28, 2022
    </Text>
    <TermsText>
      {`\n`}Honeypages.com Privacy Policy{`\n`}
    </TermsText>
    <TermsText>
      Honeypages.com, (&quot;we&quot; or &quot;Honeypages&quot;) have adopted
      this privacy policy to protect your personal information and to let you
      know how we might use it. This privacy policy only applies to activities
      you perform on the Honeypages.com website, transactions for purchasing
      Honeypages subscription services, and activities or communications that
      occur using the Honeypages service (collectively known as the
      &quot;Service&quot;) and does not apply to any other Website or offline
      point of contact between Honeypages.com, Honeypages, or any other company,
      and consumers. This policy was implemented on January 1, 2003 this policy
      may change from time-to-time, please periodically review this page. Each
      time you use the Service or provide us with information, by doing so you
      are accepting the practices described in this privacy policy at that time.
    </TermsText>

    <TermsText>
      {`\n`}What do we collect?{`\n`}
    </TermsText>
    <TermsText>Types of information we collect may include:{`\n`}</TermsText>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>Email address and password</TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Profile information you submit including, by way of example, your date
          of birth or age, images and videos, location, bio information, looking
          for information, gender and gender preference, height, weight, hair
          color, ethnicity, religion, living situation, profession, and income
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Purchase information such as hashed partial credit card number, date
          and time of transaction, amount of transaction and IP and device
          information from which the purchase is made
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Contacts with other users including interactions with other user’s
          profiles, such information will include any images or videos you may
          directly send to another user through the Site even though such image
          is not posted to your profile
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          &quot;Friends&quot; or &quot;favorites&quot; as identified by you
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Your device information (e.g., device model, operating system version,
          device date and time, unique device identifiers, mobile network
          information)
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>Site browsing history</TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>Geo-location, including IP address</TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Login and logout history If you choose not to provide information, we
          may not be able to provide you with requested products, services or
          information.
        </TermsText>
      </View>
    </View>

    <TermsText>
      {`\n`}How do we use the data we collect?{`\n`}
    </TermsText>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Profile information, contacts/interactions with other users, and
          browsing history are all used to provide our social networking
          service. This information may also be used in connection with fraud
          inquiries and identification.
        </TermsText>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Email address and password are used to identify and locate your
          account and to protect it from being accessed by others.{`\n`}
        </TermsText>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Device and IP history data are used for Site optimization as well as
          fraud detection.{`\n`}
        </TermsText>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>
          {'\u2022'}
          {` `}
        </TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          Purchase history and data are collected in order to service your
          account with the Site as well to comply with payment processor and
          card issuer rules. The information is also retained in connection with
          fraud detection.
        </TermsText>
      </View>
    </View>

    <TermsText>
      {`\n`}How this information is shared{`\n`}
    </TermsText>
    <TermsText>
      Your email address may be shared with a third party in order to service
      our relationship messages. Your email address will only be used by such
      third party in order to deliver to you messages like purchase
      confirmations, communications from other users and special deals from the
      Site. In connection with chargebacks or other fraud issues, we may share
      your account, purchase, login and other data in order to determine if a
      charge is legitimate or fraudulent.
    </TermsText>
    <TermsText>
      {`\n`}Third Party Payment Processors{`\n`}
    </TermsText>
    <TermsText>
      As and when you determine to make a purchase from the Site, you will be
      sent to a webpage where you will securely submit your payment information
      to one of our third party payment processors. Such payment processor’s
      handling of your data is outside of the terms of this Privacy Policy. In
      connection with such purchase we will receive certain information,
      including a partial hashed copy of your payment information, together with
      the purchase you made.
    </TermsText>
    <TermsText>
      {`\n`}Use of information by other users{`\n`}
    </TermsText>
    <TermsText>
      This Privacy Policy does not relate to how other viewers/users of the Site
      may use or retain your information. You should consider all information
      and content visible through your profile public information. Further, you
      should consider any information you determine to share through chat
      messages, through any forums, interactions with other user profiles,
      interactions with your own profile, or any information you otherwise share
      with other users/viewers of the Site through any mechanism to be public
      information and not covered by this Privacy Policy.
    </TermsText>
    <TermsText>
      {`\n`}Data Retention{`\n`}
    </TermsText>
    <TermsText>
      All data collected from and about users is retained in compliance with our
      internal data retention policy in order to comply with law and for fraud
      detection purposes. If we receive a request to delete your personally
      identifying information, all information will be deleted in compliance
      with law and rules related to card issuers and payment processing. For
      questions about data privacy, please contact our DPO as follows: For EU
      persons: dpoeu@greatpersonalsmedia.com For non-EU persons:
      dpo@greatpersonalsmedia.com
    </TermsText>
    <TermsText>
      {`\n`}California Residents{`\n`}
    </TermsText>
    <TermsText>
      Under the California Consumer Privacy Act, California residents have a
      right to request a copy of the following:{`\n`}
    </TermsText>

    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>{`1. `}</TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          The categories of information we have collected about you;
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>{`2. `}</TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          The categories of sources of the information we have collected about
          you;
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>{`3. `}</TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          The purpose for which we have collected such information about you;
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>{`4. `}</TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          A copy of the personally identifying information we have collected
          about you; and,
        </TermsText>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.bullet}>
        <TermsText>{`5. `}</TermsText>
      </View>
      <View style={styles.bulletText}>
        <TermsText>
          To be informed if we have sold or disclosed your personally
          identifying information to a third party and for what purpose.
        </TermsText>
      </View>
    </View>

    <TermsText>
      {`\n`}Although we are not a California company, we will provide this
      information to California residents for free up to two times per twelve
      month period. When provided, the responsive information will be for the
      twelve month period prior to the date of your request. For your privacy,
      prior to providing such information, we may require certain information
      from you to confirm it is the accountholder requesting such information.
      Also, to protect your privacy, responsive information will only be
      provided to the email address on file for your account.{`\n`}
    </TermsText>
    <TermsText>
      If you are a California resident and would like to request any of this
      information, you may do so by calling us or emailing us as follows:
    </TermsText>
    <TermsText>
      {`\n`}Toll-Free Number: 1-888-617-2001{`\n`}
    </TermsText>
    <TermsText>Email Address: dpo@greatpersonalsmedia.com</TermsText>
    <TermsText>
      {`\n`}Cookies{`\n`}
    </TermsText>
    <TermsText>
      This Site makes use of cookies. These cookies do things like track the
      advertiser who referred you to our Site, record when you have logged in so
      you don’t have to keep re-entering your login information each time you
      click a link, allow us to suggest content you might enjoy based upon
      content you have previously viewed, tailor the advertisements you see,
      secure your account when someone has attempted to guess your password, and
      for analysis purposes to learn how all our users interact with our Site in
      order to improve our Site and Service. If you do not wish to use cookies,
      please check your security settings in your internet browser or contact
      your internet browser’s customer support.
    </TermsText>
    <TermsText>
      {`\n`}Withdrawal of Consent{`\n`}
    </TermsText>
    <TermsText>
      If you would like to withdraw your consent at any time, you may do so by
      requesting account deletion. For fraud prevention, in order to request
      your account be deleted you must be able to log into your account.
    </TermsText>
    <TermsText>
      {`\n`}Changes to this Privacy Policy{`\n`}
    </TermsText>
    <TermsText>
      We reserve the right to modify this Privacy Policy at any time in
      accordance with this provision. If we make changes to this Privacy Policy,
      we will post the revised Privacy Policy on the Website and update the
      “Last Updated” date at the top of this Privacy Policy. We will also
      provide you with notice of the modification by email. If you disagree with
      the revised Privacy Policy, you may cancel your account. If you do not
      cancel your account before the date the revised Privacy Policy becomes
      effective, your continued access to or use of the Website will be subject
      to the revised Privacy Policy.
    </TermsText>
    <TermsText>
      {`\n`}Your IP Address{`\n`}
    </TermsText>
    <TermsText>
      Like most e-commerce Websites, each time use the Service, we automatically
      collect your IP address and the web page from which you came. In order to
      administer and optimize the Service for you and to diagnose problems, we
      use your IP address to help identify you and to gather broad demographic
      information about you.
    </TermsText>
    <TermsText>
      {`\n`}Information We Collect From You{`\n`}
    </TermsText>
    <TermsText>
      In order to operate the Service and to provide you with information about
      products or services that may be of interest to you, we may collect
      &quot;personal information&quot; (i.e. information that could be used to
      contact you directly without using the service &quot;demographic
      information&quot; (i.e. information that you submit, or that we collect,
      that is neither personal information nor financial information; this may
      include, but is not limited to, zip code, postal code, hometown, gender,
      username, age/birth date, purchase history information, browsing history
      information, searching history information, registration history
      information, and the content of communications between you and other
      members over the Service), subject to the rest of this paragraph.
      Demographic information is divided into two categories: 1)
      &quot;non-public information&quot;, which consists of purchase history
      information and one-on-one communications between you and other users of
      the Service; and 2) &quot;public information&quot;, which consists of all
      other demographic information. We ask that you do not enter personal
      information or financial information into your &quot;Profile&quot; (for
      example, don&apos;t use your address or passcode as your username, or
      include your name or address in your written responses), because if you do
      then it may be posted publicly on the Service, and the information will
      then be treated as &quot;demographic information&quot; that is
      &quot;public information.&quot; Please note that nowhere on the Service do
      we knowingly collect personal information from children under the age of
      18, as we require that all users represent to us that they are at least 18
      years old.
    </TermsText>
    <TermsText>
      {`\n`}Information Other Websites Collect From You{`\n`}
    </TermsText>
    <TermsText>
      On the Service websites, we may place links to other Websites operated by
      other parties. Some of these other Websites contain our brand names and
      trademarks and other intellectual property that we own; others do not.
      When you click on these links and visit these other Websites, regardless
      of whether or not they contain our brand names, trademarks and other
      intellectual property, you need to be aware that we do not control these
      other Websites or these other Websites&apos; business practices, and that
      this privacy policy does not apply to these other Websites. Consequently,
      the operators of these other Websites may collect different kinds of
      information about you, and may use and disclose that information in
      different ways than we would if it were collected on the Service. We
      encourage you to review their privacy policies and remind you that we will
      not be responsible for their actions.
    </TermsText>
    <TermsText>
      {`\n`}How We Use Personal Information{`\n`}
    </TermsText>
    <TermsText>
      Honeypages is committed to treating your personal information with the
      highest degree of care. Your email address and personal information is not
      shared with any third parties and is solely used to send email
      communication from Honeypages. Your personal information will not be
      resold to any third party. We use your email address and your other
      personal information to help us efficiently operate the Service, to
      contact you in connection with your transactions and other activities on
      the Service (including, but not limited to, confirmation emails or
      important news that could affect your relationship with Honeypages.com),
      and to forward messages to you from other Honeypages.com users. These
      types of communications are known as &quot;Operational
      Communications.&quot; In some cases, Operational Communications may also
      contain commercial messages, such as banner ads and special offers.
      {`\n`}
    </TermsText>
    <TermsText>
      We also use personal information to send you newsletters, information,
      offers and other promotional materials for Honeypages.com&apos;s or third
      parties&apos; goods or services. We attempt to send you offers that are of
      value to you, such as discounts, exclusive offers or special event
      information. The Service provides you with options to decline to receive
      communications from Honeypages.com (other than those contained in
      Operational Communications). Some of these options may only be for a
      certain category of communications; others may be more general. By posting
      a profile on the Service, you are opting in to receive messages from other
      Honeypages.com members by email or text message. To stop receiving
      messages from other Honeypages.com members, change your account settings
      on Honeypages.com.{`\n`}
    </TermsText>
    <TermsText>
      To operate the Service, including processing your transactions and
      supporting your activities on the Service, we may share your personal
      information with our agents, representatives, contractors and service
      providers so they can provide us with support services such as
      authorization of credit card transactions, email origination, receipt or
      support services, customer relationship management services, order
      fulfillment and sweepstakes and promotional fulfillment. We require these
      entities not to use your information for any other purpose.{`\n`}
    </TermsText>
    <TermsText>
      By purchasing, or registering or making reservations for, products or
      services offered or sponsored by third parties on the Service, or electing
      to receive communications (such as emails or magazine subscriptions) or
      electing to participate in contests, sweepstakes or other programs (such
      as discount or rewards programs), offered or sponsored by third parties on
      the Service, you consent to our providing your personal information to
      those third parties. Those third parties may use your personal information
      in accordance with their own privacy policies. You will need to contact
      those third parties to instruct them directly regarding your preferences
      for the use of your personal information by them. Additionally, you agree
      that we may use and disclose all such information so submitted to such
      third parties in the same manner in which we are entitled to use and
      disclose any other information you submit to us.{`\n`}
    </TermsText>
    <TermsText>
      In some cases, we may enter into a promotional relationship with another
      company in which we prominently display their brand name or trademarks on
      pages of the Service. These pages are known as &quot;Co-Branded
      Pages&quot; and these companies are known as &quot;Co-Branded
      Companies.&quot; If the page on which you submit information is a
      Co-Branded Page, or was accessed by clicking on a link on a Co-Branded
      Page, then we may share your personal information with the associated
      Co-Branded Company. Co-Branded Companies may use your personal information
      in accordance with their own privacy policies. You will need to contact
      Co-Branded Companies to instruct them directly regarding your preferences
      for the use of your personal information by them. Additionally, you agree
      that we may use and disclose all such information so submitted to such
      Co-Branded Companies in the same manner in which we are entitled to use
      and disclose any other information you submit to us. Some Co-Branded Pages
      may contain an action tag (also known as a Web Beacon or a 1 pixel .gif
      file) that a third party, may use to read cookies that it, or its clients,
      may have placed on your browser at other (non-Highrreply.com) web sites
      before your visit to Honeypages.com. This technology is used to measure
      the effectiveness of advertisements on such other Websites that promote
      Co-Branded Pages. Further, such other third parties may use the
      information collected through this technology to learn more about your
      visits to this Service and other Websites in order to provide
      advertisements about goods and services of interest to you.{`\n`}
    </TermsText>
    <TermsText>
      Any third party with whom we are allowed to share your personal
      information is authorized to use your personal information in accordance
      with our contractual arrangements with such third parties and in
      accordance with their own privacy policies, over which we have no control,
      and you agree that we are not responsible or liable for any of their
      actions or omissions. Those who contact you will need to be instructed
      directly by you regarding your preferences for the use of your personal
      information by them.{`\n`}
    </TermsText>
    <TermsText>
      Please read the information below under the heading &quot;Special Cases in
      which we Share Personal and Financial Information&quot; to learn more ways
      in which we may share your personal information.
    </TermsText>
    <TermsText>
      {`\n`}How We Use Public Information and Other Demographic Information
      {`\n`}
    </TermsText>
    <TermsText>
      We may review all demographic information. We may use public information
      to enable other users to find your profile, to determine whether they are
      a match for you and to communicate with you. We may use demographic
      information to tailor the Service and communications to your interests. We
      may also share demographic information with advertisers on an anonymous
      and aggregated basis (i.e., without telling the advertisers your
      identity). One of the reasons we may do this is to increase the likelihood
      that our advertisers&apos; goods and services will appeal to
      Honeypages.com&apos;s users, so that we may target specific ads at
      specific demographic groups. Our sharing of demographic information with
      advertisers is anonymous (i.e., we do not tell advertisers which
      particular Honeypages.com users are members of which demographic groups),
      subject to the rest of this privacy policy. When you respond to an
      advertisement, however, we ask you to remember that if that ad that is
      targeted to a demographic group and you decide to give the advertiser your
      personal information, then the advertiser may be able to identify you as
      being a member of that demographic group. Please also be aware that when
      we disclose your financial information or personal information to a
      Co-Branded Company, as described above, we may also disclose to that
      Co-Branded Company your demographic information, other than the content of
      one-on-one communications between you and other members. Please also be
      aware that we may disclose your demographic information on a non-anonymous
      basis as described above in the paragraph titled &quot;Special Cases in
      which we Share Personal and Financial Information.&quot; Also, to read
      further details about how we may use your public information, see our
      Terms of Use.
    </TermsText>
    <TermsText>
      {`\n`}Changing our Privacy Policy for Previously Gathered Information
      {`\n`}
    </TermsText>
    <TermsText>
      If at any point we decide to use particular personally identifiable
      information in a manner different from that stated at the time it was
      collected, we will notify users by way of an email or by providing 30 days
      notice on the Service. Please note that we will continue to have the right
      to change our privacy policy and practices, and how we use your personally
      identifiable information, without notice, as described in the first
      paragraph of this Privacy Policy, provided that such changes shall only
      apply to information gathered on or after the date of the change.
    </TermsText>
    <TermsText>
      {`\n`}How You Can Access and Update Your Email Preferences, Personal
      Information and Public Information{`\n`}
    </TermsText>
    <TermsText>
      We give you the opportunity to opt-out of certain communications and
      modify personal information or demographic information you have provided
      to us, and to hide demographic information from, or make demographic
      information visible to, the public users of the Service, at anytime by
      going to the &quot;Account Settings&quot; in your Honeypages.com profile
      of the Service. Please be aware that it may take several hours for the
      changes you make to take effect on the public areas of the Service. We
      thank you for your patience. Please note that changing or deleting your
      information in the &quot;Account Settings&quot; section of the Service, or
      otherwise opting-out of receipt of email communications from
      Honeypages.com, will only change or delete the data in our database for
      purposes of future activities on the Service and for managing future
      communications from Highrreply.com. These changes and deletions will not
      change or delete emails or information that we may have already forwarded
      to other users or credit card companies or any other third parties, all as
      provided above in this privacy policy.{`\n`}
    </TermsText>
    <TermsText>
      If you have any questions or concerns about this privacy policy, the
      practices of the Service, or your dealings with the Service, you can
      contact us at support@Honeypages.com or by calling +1-305-712-6612. You
      can also send us mail to: Privacy Officer, Owner and Operator of
      Honeypages.com, 705 Washington Ave 2nd Floor, Miami Beach, FL. 33139.
    </TermsText>
  </CustomScrollbar>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  termsTitle: {
    color: colors.textMain,
    fontSize: 17,
    fontFamily: text.bold.fontFamily,
  },
  termsSubTitle: {
    color: colors.textMain,
    fontSize: 16,
    fontFamily: text.semiBold.fontFamily,
  },
  termsText: {
    color: colors.textMain,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: text.regular.fontFamily,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    marginVertical: 4,
  },
  bullet: {
    width: 17,
  },
  bulletText: {
    flex: 1,
  },
})

export default PrivacyPolicy
