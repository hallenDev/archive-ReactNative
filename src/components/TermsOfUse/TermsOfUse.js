import React from 'react'
import { StyleSheet, Text } from 'react-native'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { colors, text } from '~/ui/theme'

const TermsText = ({ children }) => (
  <Text style={styles.termsText}>{children}</Text>
)

const TermsOfUse = () => (
  <CustomScrollbar
    contentContainerStyle={styles.container}
    scrollEventThrottle={40}
  >
    <Text style={styles.termsTitle}>
      TERMS AND CONDITIONS OF USE OF Honeypages.com
    </Text>
    <Text style={styles.termsSubTitle}>LAST UPDATED ON Apr 28, 2022</Text>
    <TermsText>
      {`\n`}Please read the following User Agreement.{`\n`}
    </TermsText>
    <TermsText>
      When you sign up for any service on the social networking platform
      contained within the Honeypages.com site (such services, platform and site
      are referred to herein collectively as the “Site”), you agree to all of
      the terms and conditions of this User Agreement (the “Agreement”). You
      must agree to abide by all of the terms and conditions contained in this
      Agreement in order to become or remain an authorized user of the Site.
      Please read the following terms and conditions carefully, as they form the
      agreement between the Owner and operator of Honeypages.com, or any of its
      successors or assigns (referred to herein as the “Company”, “we” or “us”)
      and you (sometimes referred to herein as “you”, “your” or the “User”). IF
      YOU DO NOT AGREE TO THESE TERMS AND CONDITIONS, YOU MAY NOT USE THE
      SERVICE, AND SHOULD NOT PROCEED TO REGISTER. BY USING THE SERVICE YOU ARE
      AGREEING TO BE BOUND BY THIS AGREEMENT, INCLUDING ANY AND ALL AMENDMENTS
      THAT WE MAY MAKE TO IT FROM TIME TO TIME.
    </TermsText>

    <TermsText>
      {`\n`}Right to Use{`\n`}
    </TermsText>
    <TermsText>
      Your right to use the Site is subject to any limitations, conditions, and
      restrictions established and enforced by us from time to time, in our sole
      discretion. We may alter, suspend, terminate, or discontinue any aspect of
      the Site at any time, including the availability of any Site feature,
      database, or content. We may also impose limits on certain features and
      aspects of the Site or restrict your access to parts or all of the Site
      without notice or liability.{`\n`}
    </TermsText>
    <TermsText>
      Use of the Site to promote, solicit, or engage in prostitution or to
      operate an escort service is STRICTLY PROHIBITED.
    </TermsText>

    <TermsText>
      {`\n`}Export Control{`\n`}
    </TermsText>
    <TermsText>
      The Site must not be viewed or used in, or exported or re-exported to, any
      jurisdiction in which the access, viewing, downloading, or other use of
      the Site e would or could reasonably constitute a violation of any law,
      regulation, rule, or custom. The Site must not be accessed by (i) anyone
      located in any country under U.S. embargo; or (ii) any person or entity on
      the U.S. Treasury Department&apos;s list of Specially Designated Nationals
      or the U.S. Commerce Department&apos;s Table of Deny Orders. The foregoing
      groups are not exhaustive, and you are solely responsible for complying
      with the laws, regulations, rules, and customs in your own jurisdiction.
    </TermsText>

    <TermsText>
      {`\n`}Adults Only{`\n`}
    </TermsText>
    <TermsText>
      THIS SERVICE IS FOR ADULTS ONLY. By using or viewing the Site you
      represent, warrant, and covenant that you are aware that the Site may
      contain explicit adult oriented materials, are the greater of 18 years old
      or the age of majority in your jurisdiction (the “Age of Majority”), and
      are not prohibited by law from using the Site. If you use of the Site in
      violation of this section, you may be subject to legal action as a result.
      In the event you become aware of a user who is not at least the Age of
      Majority, you must immediately cease all conversation with such user and
      report the user’s account to us regardless of the age of consent or other
      similar laws in your area. Failure to do so will subject your account to
      termination and, if we feel it appropriate, in our sole and absolute
      discretion, a report regarding your account being submitted to law
      enforcement.
    </TermsText>

    <TermsText>
      {`\n`}Non-Commercial Use{`\n`}
    </TermsText>
    <TermsText>
      The Site is for personal use only. Members may not use the Site in
      connection with any commercial endeavors, including without limitation any
      form of escort or companionship business. Organizations, companies,
      agencies, and/or businesses may not become members and should not use the
      Site for any purpose. You may not advertise or solicit any user or member
      to buy or sell any products or services through the Site. You may not
      transmit any chain letters, junk or spam email to other users or members.
      Further, you may not use any information obtained from the Site in order
      to contact, advertise to, solicit, or sell to any user or member without
      their prior express consent. If you breach the terms of this section
      and/or send or post unsolicited bulk email, spam or other unsolicited
      communications of any kind through the Site, we reserve all rights, claims
      and causes of action we may have, statutory or otherwise, including but
      not limited to, the right to seek statutory penalties for each such
      unsolicited communication you send through the Site.
    </TermsText>

    <TermsText>
      {`\n`}Code of Conduct{`\n`}
    </TermsText>
    <TermsText>
      You agree to use the Site in accordance with the following Code of
      Conduct:{`\n`}
    </TermsText>

    <TermsText>
      a) You are solely responsible for any content, including, but not limited
      to, text, audio or video recordings, photographs, graphic depictions, or
      any other type of material, data or information (collectively, the
      &quot;Content&quot;) that you post on the Site or display to other members
      of the Site. You will keep all Content provided to you through the Site
      private and confidential and will not disclose such Content to anyone
      without the permission of the person who provided it to you; b) You are
      aware that the Site may contain explicit adult oriented materials provided
      only by consenting users; c) You will not use the Site to engage in any
      form of harassment or offensive behavior, including, but not limited to,
      the posting of any Content that contains sexual conduct (whether actual or
      simulated); libelous, slanderous, abusive or defamatory statements; or
      racist, pornographic, obscene, or offensive language, nor will you state,
      for fantasy role-play or any other reason, that you engage or have engaged
      in any illegal activity; d) You will not post any Content or use the Site
      in any way that: i. violates, plagiarizes or infringes upon the rights of
      any third party, including but not limited to any copyright or trademark
      law, privacy or other personal or proprietary rights, or ii. is fraudulent
      or otherwise unlawful conduct in connection with your use of the Site or
      violates any law; e) You will not use the Site to distribute, promote, or
      otherwise publish any material containing any solicitation for funds,
      advertising, or solicitation for goods or services; f) Your use of the
      Site is for your own personal use. You may not allow others to use the
      Site and you may not transfer accounts with other users; g) You will not
      use the Site to infringe on any privacy right, property right, or other
      civil right of any person; h) You will not use the Site to impersonate any
      third party, with or without their permission, nor will you claim to be
      any age that you are not (for the avoidance of doubt, anyone claiming to
      be underage, even he or she is an adult, for fantasy role-play or any
      other reason, will have his or her account terminated and, in our sole
      discretion, reported to law enforcement and/or the National Center for
      Missing and Exploited Children); i) You will not record or otherwise
      capture any portion of any other member’s profile or chats (whether video
      or text) for any purpose without such member’s express written consent;
      this means you may not screen cap, crawl, spider or in any other way
      capture and/or share any portion of any member’s profile on the Site; i)
      You will not forward any chain letters through the Site; k) You will not
      use the Site to seek, offer, or discuss the exchange of sexual services
      for any type of consideration; l) You will not use the Site for any
      illegal purpose, including, by way of example only, for prostitution; m)
      You will not use the Site in connection with any form of escort or
      companionship services or any other type of arrangement where you or the
      other person is compensated for your or his/her time and/or services; and
      n) You will not use the Site in any way in connection with human or sex
      trafficking of any kind.{`\n`}
    </TermsText>

    <TermsText>
      Use of the Site or Service to promote, solicit, or engage in prostitution
      or escort services is STRICTLY PROHIBITED.
    </TermsText>

    <TermsText>
      {`\n`}Privacy and Use of Information.{`\n`}
    </TermsText>

    <TermsText>
      As more fully set forth in our Privacy Statement, your personal
      information will not be resold to any third party. Please note, however,
      all information you provide to us may be shared with other third parties
      as necessary to comply with applicable law and to generally cooperate with
      law enforcement and the court system in investigating and prosecuting
      suspected criminal activities or otherwise, including, without limitation,
      in response to inquiries from law enforcement and regulatory agencies.
    </TermsText>

    <TermsText>
      {`\n`}Content Posted By Members{`\n`}
    </TermsText>

    <TermsText>
      By agreeing to the terms and conditions of this Agreement, you represent
      and warrant that all Content you upload to the Site does not in any way
      infringe on anyone&apos;s intellectual property rights. You also authorize
      the Site to post any and all photographs uploaded by you throughout The
      Site and other associated websites featuring other members of the Site.
      The Site hereby asserts immunity with respect to all Content provided by
      members or other third parties, as provided by law, including, but not
      limited to, under the Communications Decency Act. We will remove any
      Content that you may post on the Site upon being notified, as provided in
      these terms and conditions, that the Content you post on the Site violates
      the intellectual property rights of another. We may remove any Content
      that you post on this Site that we believe, in our sole discretion,
      violates this Agreement without any obligation to provide you prior notice
      of such removal. Members and others are prohibited from uploading any
      Content to the Site which, in our sole opinion, might be illegal or
      offensive, including, but not limited to, Content involving bestiality,
      urination, other bodily excretions, defamatory material or otherwise
      obscene material, or any conduct that violates the prohibitions set forth
      under &quot;Code of Conduct,&quot; above, or any other provision of this
      Agreement. You may not post any Content that solicits any information or
      response from anyone under 18 years of age, mischaracterizes your
      identity, solicits any information that might be used for unlawful
      purposes, or encourages unlawful activities. You may not post any Content
      for commercial purposes, including, but not limited to, email marketing,
      advertising of goods or services, any investment opportunities, contests,
      or similar activities. Additionally, the Site reserves the right, in the
      Site&apos;s sole discretion, to immediately suspend your account, file for
      injunctive relief, file for civil redress and/or report any conduct which
      the Site, in its sole discretion, believes may violate this Agreement or
      any law to any and all authorities that may have jurisdiction over the
      matter. In the event any actions or proceedings are brought against the
      Site as a result of Content you have posted on the Site, or your engaging
      in any prohibited activities, as set forth in this section or in this
      Agreement, you agree to indemnify and hold the Site harmless with respect
      to all costs and expenses, including, but not limited to, attorneys&apos;
      fees that the Site may incur as a consequence of your posting of such
      content or engaging in such prohibited activities.
    </TermsText>

    <TermsText>
      {`\n`}No Site Created Profiles{`\n`}
    </TermsText>

    <TermsText>
      Unlike many competitors, this Site does not contain any profiles created
      by the Site whether to increase member numbers or entertain or otherwise
      engage with users of the Site nor for any other purpose. Notwithstanding
      anything herein to the contrary, the Site reserves the right to create
      profiles for the purpose of quality assurance testing and other related
      user experience monitoring purposes. Such Site created profiles will not
      interact with other members of the Site.
    </TermsText>

    <TermsText>
      {`\n`}Total Member Numbers{`\n`}
    </TermsText>

    <TermsText>
      From time to time we may include an estimation regarding the number of
      members on the Site. Any such estimation will include all accounts (both
      free and paid) created since the inception of the Site as we do not purge
      inactive accounts. For your information, a member&apos;s
      &quot;hotness&quot; ranking on the Site is indicative of, among other
      matters, how recently the account has been accessed. While the
      &quot;hotness rating&quot; is indicative, it should not be taken as a
      guarantee that the person checks messages or even has a paid account to
      communicate with you. Please note that we do work expeditiously to remove
      what we believe to be fraudulent/malicious profiles as and when they are
      reported. We take all such reports extremely serious as we intend for the
      Site to be a place for like-minded men and women to communicate and we
      have no tolerance for individuals abusing our system. If you are contacted
      through the Site (whether by instant message, chat rooms, messages or
      otherwise) and believe such contact to be fraudulent/malicious please
      immediately report the matter to us.{`\n`}
    </TermsText>

    <TermsText>
      Member&apos;s Obligation to Comply with 18 U.S.C. 2257 With Respect to
      Certain Content{`\n`}
    </TermsText>

    <TermsText>
      You should be aware that, pursuant to federal law, any visual depictions
      that you post on the Site that portray actual sexually explicit conduct,
      depictions of the genitals or pubic area, or simulated sexually explicit
      activity, as such terms are defined in 18 U.S.C. §2256 (2)(A)(i)-(v) and
      18 U.S.C. §2257A, require that you maintain the records required by 18
      U.S.C. 2257 and must contain an &quot;18 U.S.C. 2257 Record-Keeping
      Requirements Compliance Statement.&quot; Your failure to comply with the
      provisions of 18 U.S.C. 2257 may make you subject to criminal and civil
      prosecution for the violation of 18 U.S.C. 2257.
    </TermsText>

    <TermsText>
      {`\n`}Use of Information on the Site{`\n`}
    </TermsText>

    <TermsText>
      You acknowledge and agree that: a) We cannot ensure the security or
      privacy of information you provide through the Internet, email, messaging
      or otherwise, and through your email or other messages; you release us
      from any and all liability in connection with the breach of the security
      of such information and/or messages and with respect to the use of such
      information by other parties; b) We are not responsible for, and cannot
      control, the use of any information, by anyone, that you provide to any
      other parties or the Site and you should use caution in selecting the
      personal information you provide to others through the Site; c) We cannot
      assume any responsibility for the content of any communication sent by any
      user on the Site, and you release us from any and all liability in
      connection with the contents of any such communication you may receive
      from other users; d) You acknowledge that you cannot bring legal action
      against the Site or any of its employees, officers, or agents for any
      damages of any kind, under any theory, as a consequence of using the Site;
      and e) Any and all images uploaded to the Site are subject to an
      irrevocable, unlimited, worldwide, fully paid, royalty free license from
      you to the Site and such images may be used by the Site, without
      restriction, on the Site, in emails and as marketing materials. By
      accepting this Agreement and its terms and conditions you specifically
      authorize us to use any images you upload to the Site for marketing the
      Site; and, f) You may not use the Site for any unlawful purpose. We may
      refuse to grant you or discontinue your use of a user name, for whatever
      reason, including, but not limited to, that the user name you have chosen
      impersonates someone else, is protected by trademark or proprietary law,
      or is vulgar or otherwise offensive, as determined by us in our sole
      discretion.{`\n`}
    </TermsText>

    <TermsText>
      We cannot guarantee, and assume no responsibility for verifying, the
      accuracy of the information provided by any other user of the Site,
      including but not limited to, information regarding a member&apos;s age
      and marital status. Additionally, as users may discontinue or suspend
      their membership at any time, we cannot guarantee that individuals seen in
      various advertisements are currently active members. You hereby
      acknowledge and agree that we have no responsibilities or liabilities for
      any inaccuracies, intentional or unintentional, made by users or as a
      result of out of date information.
    </TermsText>

    <TermsText>
      {`\n`}Dating Site Cautions{`\n`}
    </TermsText>

    <TermsText>
      The following are precautions you should consider when meeting or
      corresponding with anyone on any dating or social networking website:
    </TermsText>
    <TermsText>
      (a) Anyone who is able to commit identity theft can also falsify a dating
      profile; (b) There is no substitute for acting with caution when
      communicating with any stranger who wants to meet you; (c) Never include
      your last name, email address, home address, phone number, place of work,
      or any other identifying information in your dating profile or initial
      email messages. Stop communicating with anyone who pressures you for
      personal or financial information or attempts in any way to trick you into
      revealing it; and (d) If you choose to have a face-to-face meeting with
      another member, always tell someone in your family or a friend where you
      are going and when you will return. Never agree to be picked up at your
      home. Always provide your own transportation to and from your date and
      meet in a public place with many people around.{`\n`}
    </TermsText>
    <TermsText>
      Should you elect to interact with any member of the Site outside of the
      Site, despite the cautions and warnings contained above and elsewhere in
      this Agreement, you understand and agree we shall bear no responsibility
      in connection with such interactions, regardless of the form of such
      interactions, including, without limitation, text, telephone, purchases,
      money transactions, email or in-person.
    </TermsText>

    <TermsText>
      {`\n`}How Your Content May be Used{`\n`}
    </TermsText>

    <TermsText>
      When you create a profile with the Site, your profile will be shared with
      other members of the Site. Additionally, when you upload any videos as a
      part of your profile your video may automatically be watermarked with the
      Site&apos;s watermark and, unless you unmark the &quot;Add to&quot; or
      similarly termed box, your video will be automatically uploaded to the
      Site.
    </TermsText>

    <TermsText>
      {`\n`}Introductions{`\n`}
    </TermsText>

    <TermsText>
      The Site may cause pop-ups to display as a system notification on your
      screen while you are viewing the Site. These system notifications may or
      may not indicate they have been initiated by the Site and may provide you
      with limited information about other members of the Site and/or such
      member&apos;s activity on the Site. The system notifications may prompt
      you to initiate dialogue with other member(s) (who may or may not have
      upgraded to a paid account and may have varying login and activity
      levels). If you wish to initiate dialogue and have not purchased a
      membership to the Site, you will be required to purchase a paid membership
      prior to being able to initiate or even review any dialogue; however, it
      is possible that the member with whom you wish to initiate dialogue may
      not respond for various reasons including, without limitation, the member
      is not interested in responding, may not be actively monitoring his/her
      account and/or may no longer be available. If the sole reason you upgrade
      your membership is to correspond with one specific member and such member
      does not respond to your correspondence, you may request a full refund
      within ten (10) days of your initial membership purchase by calling
      customer service. Upon initiating the refund, your account will revert to
      free and you will not be able to review any responses or messages from any
      members should any be sent to your account.
    </TermsText>

    <TermsText>
      {`\n`}Quality Assurance Accounts{`\n`}
    </TermsText>

    <TermsText>
      The Site reserves the right to implement quality assurance accounts which
      accounts will be flagged with a “QA” flag to alert users of the Site. If
      the Site implements quality assurance accounts, this section will be
      updated to note these accounts have been created and activated and the
      date at the top of this Agreement will be updated to the then current
      date. In the event these quality assurance accounts are implemented, such
      accounts may or may not: correspond to real individuals, use real or
      licensed photographs, and/or be administered by real individuals or by an
      automated process. In the event these accounts are implemented, the
      intention behind the implementation will be to monitor and enhance
      activity and enjoyment on the Site. In the event such accounts are used,
      none of these accounts will offer or agree to meet with any other user of
      the Site nor will the accounts agree to or offer communications outside of
      the Site.
    </TermsText>

    <TermsText>
      {`\n`}While You Were Away{`\n`}
    </TermsText>

    <TermsText>
      The Site may, from time to time, offer an automated message and response
      program called “While You Were Away”. You may change your settings for
      “While You Were Away” at any time by updating your account settings.
    </TermsText>

    <TermsText>
      {`\n`}Notice of Claimed Infringement{`\n`}
    </TermsText>

    <TermsText>
      The Site respects the intellectual property of others, and we ask our
      members and others to do the same. We voluntarily observe and comply with
      the United States’ Digital Millennium Copyright Act. If you believe that
      your work has been copied in a way that constitutes copyright
      infringement, or your intellectual property rights have been otherwise
      violated, please provide the Site’s Designated Copyright Agent the
      following information:{`\n`}
    </TermsText>

    <TermsText>
      a) an electronic or physical signature of the person authorized to act on
      behalf of the owner of the copyright or other intellectual property
      interest; b) description of the copyrighted work or other intellectual
      property that you claim has been infringed; c) a description of where the
      material that you claim is infringing is located on a Site; d) your
      address, telephone number, and email address; e) a statement by you that
      you have a good faith belief that the disputed use is not authorized by
      the copyright owner, its agent, or the law; and f) a statement by you,
      made under penalty of perjury, that the above information in your Notice
      is accurate and that you are the copyright or intellectual property owner
      or authorized to act on the copyright or intellectual property owner’s
      behalf. You may send your Notice of Claimed Infringement to:
      {`\n`}
    </TermsText>

    <TermsText>
      Lawrence G. Walters
      {`\n`}
      195 W. Pine Ave
      {`\n`}
      Longwood, FL 32750
      {`\n`}
      Fax: (407) 774-6151
      {`\n`}
      Notice@DMCANotice.com
      {`\n`}
    </TermsText>

    <TermsText>
      DO NOT SEND ANY OTHER INQUIRIES TO OUR DMCA AGENT. SEND ALL OTHER
      INQUIRIES TO: support@gpnethelp.com
    </TermsText>

    <TermsText>
      {`\n`}Repeat Infringers{`\n`}
    </TermsText>

    <TermsText>
      The Site will terminate the account of any member who the Site believes
      has infringed on the rights of any third party(ies) one or more times. For
      the avoidance of doubt, the Site specifically reserves the right to
      terminate the account of any member reported by any third party for
      infringing on such third party&apos;s rights and the Site will immediately
      terminate the account of any member reported more than once for infringing
      on the rights of a third party.
    </TermsText>

    <TermsText>
      {`\n`}Notification and Take Down Procedures{`\n`}
    </TermsText>

    <TermsText>
      The Site implements the following &quot;notification and takedown&quot;
      procedure upon receipt of any notification of claimed copyright
      infringement. The Site reserves the right at any time to disable access
      to, or remove any material or activity accessible on or from any Site or
      any Materials claimed to be infringing or based on facts or circumstances
      from which infringing activity is apparent. We reserve the right to
      terminate any account reported for infringing on the intellectual property
      of any third party, and we will act expeditiously to remove access to all
      identifiable material that is alleged to infringe on a third party&apos;s
      copyright, according to the procedure set forth in 17 U.S.C. §512 of the
      Digital Millennium Copyright Act (&quot;DMCA&quot;). The Site&apos;s DMCA
      Notice Procedures are set forth in the preceding paragraph. If the notice
      does not comply with §512 of the DMCA, but does comply with three
      requirements for identifying sites that are infringing according to §512
      of the DMCA, the Site shall attempt to contact or take other reasonable
      steps to contact the complaining party to help that party comply with the
      notice requirements. When the Designated Agent receives a valid notice, we
      will expeditiously endeavor to remove and/or disable access to the
      infringing material and may notify the affected user. Then, the affected
      user may submit a counter-notification to the above designated agent
      containing a statement made under penalty of perjury that the user has a
      good faith belief that the material was removed because of
      misidentification of the material. After the designated agent receives the
      counter-notification, we will replace the material at issue within 10-14
      days after receipt of the counter-notification unless the designated agent
      receives notice that a court action has been filed by the complaining
      party seeking an injunction against the infringing activity. We reserve
      the right to modify, alter or add to this policy, and all users should
      regularly check back to these Terms and Conditions to stay current on any
      such changes.
    </TermsText>

    <TermsText>
      {`\n`}DMCA Counter-Notification Procedure{`\n`}
    </TermsText>

    <TermsText>
      If the recipient (the &quot;Recipient&quot;) of a Notice of Claimed
      Infringement (&quot;Notice&quot;) feels that the Notice is erroneous or
      false, and/or that allegedly infringing material has been wrongly removed
      in response to a Notice as outlined above, the Recipient is permitted to
      submit a counter-notification pursuant to §512(g)(2) and (3) of the DMCA.
      A counter-notification is the proper method for the Recipient to dispute
      the removal or disabling of material (the &quot;Material&quot;) pursuant
      to a Notice. The information that a Recipient provides in a
      counter-notification must be accurate and truthful, and the Recipient will
      be liable for any misrepresentations which may cause any claims to be
      brought against us relating to the Content.
    </TermsText>

    <TermsText>
      {`\n`}To submit a counter-notification, please provide our Designated
      Copyright agent the following information:{`\n`}
    </TermsText>
    <TermsText>
      a) A specific description of the material that was removed or disabled
      pursuant to the Notice. b) A description of where the material was located
      within the Site before such material was removed and/or disabled. Please
      provide the specific URL if possible. c) A statement reflecting the
      Recipient&apos;s belief that the removal or disabling of the Material was
      done so erroneously. For convenience, the following format may be used: “I
      swear, under penalty of perjury, that I have a good faith belief that the
      referenced material was removed or disabled by the service provider as a
      result of mistake or misidentification of the material to be removed or
      disabled.” d) The Recipient&apos;s physical address, telephone number, and
      email address. Written notification containing the above information must
      be signed and sent to:{`\n`}
    </TermsText>

    <TermsText>
      Lawrence G. Walters
      {`\n`}
      195 W. Pine Ave
      {`\n`}
      Longwood, FL 32750
      {`\n`}
      Fax: (407) 774-6151
      {`\n`}
      Notice@DMCANotice.com
      {`\n`}
    </TermsText>

    <TermsText>
      Alternately, to email the above information, You must digitally sign the
      email and send it to: Notice@DMCANotice.com DO NOT SEND ANY OTHER
      INQUIRIES TO OUR DMCA AGENT. SEND ALL OTHER INQUIRIES TO:
      support@gpnethelp.com{`\n`}
    </TermsText>

    <TermsText>
      After receiving a DMCA-compliant counter-notification, our designated
      copyright agent will forward it to us, and we will then provide the
      counter-notification to the entity who first provided the Notice
      concerning the subject material.{`\n`}
    </TermsText>

    <TermsText>
      Additionally, within ten to fourteen (10-14) days of our receipt of the
      counter-notification, we will replace or cease disabling access to the
      disputed material provided that we or our designated copyright agent have
      not received notice from the entity who first provided the Notice that
      such entity has filed a legal action pertaining to the disputed material.
      {`\n`}
    </TermsText>

    <TermsText>
      We reserve the right to modify, alter or add to this policy, and all users
      should regularly check back regularly to stay current on any such changes.
    </TermsText>

    <TermsText>
      {`\n`}Monitoring of Information{`\n`}
    </TermsText>

    <TermsText>
      We reserve the right, but have no obligation, to monitor any and all
      advertisements, public postings and messages to ensure that they conform
      to the content guidelines and this Agreement, which are both subject to
      change from time to time. We also reserve the right, but have no
      obligation, to monitor any and all messages and chats that take place
      through the Site. We are not responsible for any offensive or obscene
      material(s) that may be transmitted or posted by any and all users
      (including unauthorized users, as well as the possibility of “hackers”).
      As noted above, we are also not responsible, under any circumstances, for
      the use of any personal information, by anyone, that you post or transmit
      through the Site.
    </TermsText>

    <TermsText>
      {`\n`}Removal of Information{`\n`}
    </TermsText>

    <TermsText>
      While we do not and cannot review every message or other material posted
      or sent by users of the Site, and are not responsible for any content of
      these messages or materials, we reserve the right, but are not obligated,
      to delete, move, or edit messages or materials, including without
      limitation advertisements, public postings and messages, that we, in our
      sole discretion, may deem to violate the Code of Conduct set out above or
      to be otherwise unacceptable to us in our sole discretion. Notwithstanding
      our right to delete, move or edit messages or materials, you shall remain
      solely responsible for the content of advertisements, public postings,
      messages and other materials you may upload to the Site or otherwise
      provide to users of the Site.
    </TermsText>

    <TermsText>
      {`\n`}Termination of Access to the Site{`\n`}
    </TermsText>

    <TermsText>
      We may, in our sole discretion, terminate or suspend your access to all or
      part of the Site at any time, with or without notice, for any reason,
      including, without limitation, breach of this Agreement. Please note that
      the Site does not tolerate sex offenders on the Site and reserves the
      right to terminate any member reported as being a sex offender. Without
      limiting the generality of the foregoing, any fraudulent, abusive, or
      otherwise illegal activity may be grounds for termination of your access
      to all or part of the Site at our sole discretion, and we reserve the
      right to refer such activity to any and all appropriate law enforcement
      agencies.
    </TermsText>

    <TermsText>
      {`\n`}Proprietary Information{`\n`}
    </TermsText>

    <TermsText>
      The Site contains information, which is proprietary to us and/or users of
      the Site. We assert full copyright protection in the Site. Any information
      posted by us or users of the Site may be protected whether or not it is
      identified as proprietary to us or to the user. You agree not to modify,
      copy or distribute any such information in any manner whatsoever without
      having first received the express permission of the owner of such
      information.
    </TermsText>

    <TermsText>
      {`\n`}No responsibility{`\n`}
    </TermsText>

    <TermsText>
      We are not responsible for any incidental, consequential, special,
      punitive, exemplary, direct or indirect damages of any kind whatsoever,
      which may arise out of or relate to your use of the Site, including but
      not limited to lost revenues, profits, business or data, or damages
      resulting from any viruses, worms, &quot;Trojan horses&quot; or other
      destructive software or materials, or communications by you or other users
      of the Site, or any interruption or suspension of the Site, regardless of
      the cause of the interruption or suspension. Any claim against us shall be
      limited to the amount you paid, if any, for use of the Site during the
      previous 12 months. We may discontinue or change the Site or its
      availability to you at any time, and you may stop using the Site at any
      time, please see details on cancellation below.
    </TermsText>

    <TermsText>
      {`\n`}Security{`\n`}
    </TermsText>

    <TermsText>
      Your account is private and should not be used by anyone else. You are
      responsible for all usage or activity on the Site by users using your
      password, including but not limited to use of your password by any third
      party.
    </TermsText>

    <TermsText>
      {`\n`}Other Links{`\n`}
    </TermsText>

    <TermsText>
      The Site may from time to time contain links to other sites and resources
      (“External Links”). We are not responsible for, and have no liability as a
      result of, the availability of External Links or their contents.
    </TermsText>

    <TermsText>
      {`\n`}Fraud Team and Support Team{`\n`}
    </TermsText>

    <TermsText>
      The Site utilizes both a Fraud Team and a Support Team. Fraud Team members
      are tasked with reviewing abuse reports and flagged content, profiles,
      communications and postings. The Support Team is tasked with receiving and
      addressing account questions/issues, access problems, DMCA Notice response
      and receiving law enforcement inquiries. Random chat rooms and profiles
      may be reviewed from time to time as to whether or not the users in such
      rooms and profiles appear to be adhering to this Agreement; however, in
      conformity with our “No Obligation” section and other sections of this
      Agreement, the Site does not warrant the Site to be free from malicious
      third party users or others with bad intent nor does the Site warrant or
      represent that any information posted or communicated by any third party
      user is accurate or truthful. Neither the Support Team nor the Fraud team
      will contact any user for any purpose other than responding to or
      addressing a report, flag or other potential issue with compliance with
      this Agreement
    </TermsText>

    <TermsText>
      {`\n`}Indemnity{`\n`}
    </TermsText>

    <TermsText>
      You agree to indemnify us, our officers, directors, employees and agents,
      from any loss or damages, including without limitation reasonable legal
      fees, which we may suffer from your activities on or use of the Site,
      including without limitation any breach by you of this Agreement or any
      charges or complaints made by other parties against you. You shall
      cooperate as fully as reasonably required in the defense of any claim. We
      reserve the right to assume the exclusive defense and control of any
      matter otherwise subject to indemnification by you; provided, however,
      that you shall remain liable for any such claim.
    </TermsText>

    <TermsText>
      {`\n`}No Warranties{`\n`}
    </TermsText>

    <TermsText>
      The Site is distributed on an “as is” basis. We do not warrant that the
      Site will be uninterrupted or error-free. There may be delays, omissions,
      and interruptions in the availability of the Site. Where permitted by law,
      you acknowledge that the Site is provided without any warranties of any
      kind whatsoever, either express or implied, including but not limited to
      the implied warranties of merchantability and fitness for a particular
      purpose. You acknowledge that use of the Site is at your own risk. We do
      not represent or endorse the accuracy or reliability of any advice,
      opinion, statement or other information displayed, uploaded or distributed
      through the Site by the Site or any user of the Site or any other person
      or entity. You acknowledge that any reliance upon any such opinion,
      advice, statement or information shall be at your sole risk. If you are a
      California resident, you waive California Civil Code § 1542, which states
      “A general release does not extend to claims which the creditor does not
      know or suspect to exist in his favor at the time of executing the
      release, which if known by him must have materially affected his
      settlement with the debtor.”
    </TermsText>

    <TermsText>
      {`\n`}Modifications{`\n`}
    </TermsText>

    <TermsText>
      We may modify this Agreement from time to time. Notification of changes in
      this Agreement will be posted on the Site or sent via electronic mail, as
      we may determine in our sole discretion. If you do not agree to any
      modifications, you should terminate your use of the Site. Your continued
      use of the Site now, or following the posting of notice of any changes in
      this Agreement, will constitute a binding acceptance by you of this
      Agreement, or any subsequent modifications.
    </TermsText>

    <TermsText>
      {`\n`}Disclosure and Other Communication{`\n`}
    </TermsText>

    <TermsText>
      We reserve the right to send electronic mail to you, for the purpose of
      informing you of changes or additions to the Site, or of any Site related
      products and services. We reserve the right to disclose information about
      your usage of the Site and Demographics in forms that do not reveal your
      personal identity.
    </TermsText>

    <TermsText>
      {`\n`}Complaints{`\n`}
    </TermsText>

    <TermsText>
      To resolve or report a complaint regarding the Site or members who use the
      Site users should send an email detailing such complaint to
      support@gpnethelp.com. Immediate actions will take place in order to help
      solve the problem.
    </TermsText>

    <TermsText>
      {`\n`}Registration{`\n`}
    </TermsText>

    <TermsText>
      You may become a member of the Site by completing an online registration
      form, which must be accepted by the Site, and by payment of the applicable
      subscription fee. Upon submission of the online registration form, the
      Site or its authorized agent will process the application. In connection
      with completing the online registration form, you agree to: (a) provide
      true, accurate, current and complete information about yourself as
      prompted by the registration form (such information being the
      “Registration Data”) and (b) maintain and promptly update the Registration
      Data to keep it true, accurate, current and complete at all times while
      you are a member. You must promptly inform the Site of all changes to the
      registration data, including, but not limited to, changes in your address
      and changes in the credit card information you used in connection with
      billing for the Site. If you provide any information that is untrue,
      inaccurate, not current or incomplete, or the Site or any of its
      authorized agents have reasonable grounds to suspect that such information
      is untrue, inaccurate, not current or incomplete, the Site has the right
      to suspend or terminate your account and refuse your current or future use
      of the Site and the Site, as well as possibly subjecting you to criminal
      and civil liability. You are responsible for dishonored checks,
      inappropriate “chargebacks” or credits to your credit card and any related
      fees that we incur with respect to your account.
    </TermsText>

    <TermsText>
      {`\n`}Member Account, Password and Security{`\n`}
    </TermsText>

    <TermsText>
      As part of the registration process, you will be issued a unique user name
      and password which you must provide in order to gain access to the
      non-public portion of the Site. You certify that when asked to choose a
      username you will not choose a name which falsely represents you as
      somebody else or a name which may otherwise be in violation of the rights
      of a third party. We reserve the right to disallow the use of usernames
      that we, in our sole discretion, deem inappropriate. We reserve the right
      to modify any materials on the Site and its design at anytime, with or
      without prior notice. We reserve the right to cancel at any time the
      membership of any member who uses their selected username in violation of
      these Terms and Conditions or in any other way we, in our sole discretion,
      deem inappropriate. Your membership, the ID and password are
      nontransferable and non-assignable. You represent and warrant that you
      will not disclose to any other person your unique user name and password
      and that you will not provide access to the Site to anyone who is below
      the Age of Majority, or otherwise does not wish to view the content on the
      Site. You are solely responsible for maintaining the confidentiality of
      your user name and password and are fully responsible for all activities
      that occur under your user name and password. The Site will not release
      your password for security reasons. You agree to (a) immediately notify
      the Site of any unauthorized use of your user name and password or any
      other breach of security, and (b) ensure that you exit from your account
      at the end of each session. You are liable and responsible for any
      unauthorized use of the Site until you notify us by email regarding that
      unauthorized use. Unauthorized access to the Site is illegal and a breach
      of this Agreement. You agree to indemnify the Site against all activities
      conducted through your account. You may obtain access to your billing
      records upon your reasonable request.
    </TermsText>

    <TermsText>
      {`\n`}Credit-Enabled Features{`\n`}
    </TermsText>

    <TermsText>
      Certain features and abilities of the Site may be restricted and require
      that you utilize credits in your account to access and/or utilize such
      features and abilities. You can purchase credits at any time and your
      payment will be processed through a secure website provided by a third
      party payment provider. Other than a limited, personal, revocable,
      non-transferable, non-sublicenseable license to use the credits on the
      Site, you have no right or title in or to any such credits appearing or
      originating in the Site. The Site has the absolute right to manage,
      regulate, control, modify and/or eliminate credits as we see fit in our
      sole discretion, and we shall have no liability to you or anyone for the
      exercise of such rights. Transfers of credits between accounts are
      strictly prohibited except where explicitly authorized within the Site.
      Except as expressly provided otherwise herein, you may not sell any
      credits for “real-world” money or otherwise exchange such items for value.
      Any attempt to do so is in violation of this Agreement and may result in a
      lifetime ban from the Site. All credits that have not been purchased
      directly by you is forfeited if your account is terminated or suspended
      for any reason, in our sole and absolute discretion, or if we discontinue
      providing the Site.
    </TermsText>

    <TermsText>
      {`\n`}Recurring Transaction Agreement{`\n`}
    </TermsText>

    <TermsText>
      The Site may, from time to time, offer recurring purchases which
      automatically renew based upon either a time period or upon credits in
      your account being exhausted. You may cancel any automatically renewing
      purchase at any time during purchase to avoid your purchase automatically
      renewing by contacting our customer service department either online,
      through email or by phone. In the event that you do not cancel as provided
      and your recurring transaction is not successful for any reason, you
      understand and agree that you will be charged an administrative fee of
      $2.00 (the “Fee”) for each failed attempt to process your payment while
      keeping your account at the same purchase level, at the same or a lower
      price, up to a maximum of six (6) attempts. If your recurring transaction
      is not successful in our six (6) attempts, your account will be converted
      to a “free” account and you will no longer have access to premium
      features. For all initial purchases, you will receive an email receipt
      upon successful completion of your initial purchase. The Site reserves the
      right to contract with a third party to process all payments. Such third
      party may impose additional terms and conditions governing payment
      processing. Your card issuer agreement may contain additional terms with
      respect to your rights and liabilities as a cardholder. You agree to pay
      all amounts due to us immediately upon cancellation or termination of your
      account. We reserve the right to make changes to our fees and billing
      methods, including the addition of supplemental charges for any content or
      services that we may provide, with or without prior notice to you, at any
      time.
    </TermsText>

    <TermsText>
      {`\n`}Billing Errors{`\n`}
    </TermsText>

    <TermsText>
      If you believe that you have been erroneously billed, please notify us
      immediately of such error. If we do not hear from you within thirty (30)
      days after such billing error first appears on any account statement, such
      fee will be deemed acceptable by you for all purposes, including
      resolution of inquiries made by your credit card issuer. You release us
      from all liabilities and claims of loss resulting from any error or
      discrepancy that is not reported to us within thirty (30) days of its
      publication.
    </TermsText>

    <TermsText>
      {`\n`}Binding Agreement{`\n`}
    </TermsText>

    <TermsText>
      By supplying us with all the required information and signing up as a
      member you acknowledge and affirmatively state that you have read, and
      understand the terms set forth herein and that you agree to be bound by
      the terms and conditions hereof.
    </TermsText>

    <TermsText>
      {`\n`}NO WARRANTIES, LIMITATION OF LIABILITY{`\n`}
    </TermsText>

    <TermsText>
      YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE AND
      EXCLUSIVE RISK. THE SERVICES ARE PROVIDED ON AN “AS IS, WITH ALL FAULTS”
      AND “AS AVAILABLE” BASIS. Honeypages.COM EXPRESSLY DISCLAIMS ALL
      WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT
      LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
      PARTICULAR PURPOSE, TITLE AND NONINFRINGEMENT. Honeypages.COM MAKES NO
      WARRANTY THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, OR THAT THE
      SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE; NOR DOES
      Honeypages.COM MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED
      FROM THE USE OF THE SERVICES OR AS TO THE ACCURACY OR RELIABILITY OF ANY
      INFORMATION OBTAINED THROUGH THE SERVICES OR THAT DEFECTS IN ANY SOFTWARE,
      HARDWARE OR THE SERVICES WILL BE CORRECTED. YOU UNDERSTAND AND AGREE THAT
      ANY USE YOU MAKE OF ANY MATERIAL AND/OR DATA DOWNLOADED OR OTHERWISE
      OBTAINED THROUGH THE USE OF THE SERVICE IS AT YOUR OWN DISCRETION AND
      RISK, AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR
      COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH
      MATERIAL AND/OR DATA. UNDER NO CIRCUMSTANCES WILL WE BE RESPONSIBLE FOR
      CONSEQUENTIAL DAMAGES OR PUNITIVE DAMAGES. YOU AGREE THAT
      Honeypages.COM&apos;S MAXIMUM LIABILITY TO YOU FOR BREACH OF THIS
      AGREEMENT, OR FOR ANY OTHER REASON, SHALL BE LIMITED TO THE AGGREGATE
      AMOUNT OF MEMBERSHIP FEES YOU HAVE PAID US.
    </TermsText>

    <TermsText>
      {`\n`}Severability{`\n`}
    </TermsText>

    <TermsText>
      If any term, clause or provision hereof is held invalid or unenforceable
      by a court of competent jurisdiction, such invalidity shall not affect the
      validity or operation of any other term, clause or provision and such
      invalid term, clause or provision shall be deemed to be severed from this
      Agreement.
    </TermsText>

    <TermsText>
      {`\n`}Arbitration{`\n`}
    </TermsText>

    <TermsText>
      All Disputes (including any dispute relating to the arbitrability of this
      Agreement or any provision of this Agreement or any other dispute relating
      to arbitration) must be submitted to arbitration before and in accordance
      with the arbitration rules of the American Arbitration Association in
      accordance with its commercial arbitration rules. The term “Dispute” means
      any controversy or claim arising out of or relating to the Site or this
      Agreement, or any breach thereof, including any claim that this Agreement,
      or any part of this Agreement is invalid, illegal or otherwise voidable or
      void.
      {`\n`}
    </TermsText>

    <TermsText>
      The provisions of this Arbitration Section must be construed as
      independent of any other covenant or provision of this Agreement; provided
      that if a court of competent jurisdiction or arbitrator determines that
      any such provisions are unlawful in any way, such court or arbitrator is
      to modify or interpret such provisions to the minimum extent necessary to
      have them comply with the law. Notwithstanding any provision of this
      Agreement relating to under which state’s laws this Agreement is to be
      governed by and construed under, all issues relating to arbitrability or
      the enforcement of the Agreement to arbitrate contained herein are to be
      governed by the Federal Arbitration Act (9 U.S.C. § 1 et seq.) and the
      federal common law of arbitration.{`\n`}
    </TermsText>

    <TermsText>
      Judgment upon an arbitration award may be entered in any court having
      competent jurisdiction and will be binding, final and non-appealable. You
      and the Company hereby waive to the fullest extent permitted by law, any
      right to or claim for any punitive or exemplary damages against the other
      and agree that in the event of a dispute between them, each shall be
      limited to the recovery of any actual damages sustained by it.{`\n`}
    </TermsText>

    <TermsText>
      This arbitration provision is self-executing and will remain in full force
      and effect after the expiration or termination of this Agreement. In the
      event either party fails to appear at any properly noticed arbitration
      proceeding, an award may be entered against such party by default or
      otherwise notwithstanding said failure to appear.{`\n`}
    </TermsText>

    <TermsText>
      Arbitration take place in Miami-Dade County, Florida, exclusively.
      {`\n`}
    </TermsText>

    <TermsText>
      You and the Company hereby agree that no action (whether for arbitration,
      damages, injunctive, equitable or other relief, including rescission) will
      be maintained by any party to enforce any liability or obligation of the
      other party, whether arising from this Agreement or otherwise, or any
      other Dispute, unless brought before the expiration of the earlier of one
      year from the occurrence of the facts giving rise to such claims or within
      90 days from either the actual discovery of the facts giving rise to such
      claims or from the date on which the party should have, in the exercise of
      reasonable diligence, discovered such facts.{`\n`}
    </TermsText>

    <TermsText>
      The obligation to arbitrate is not binding upon the Company with respect
      to claims relating to its trademarks, service marks, patents, copyrights,
      or other intellectual-property rights, or requests for temporary
      restraining orders, preliminary injunctions or other procedures in a court
      of competent jurisdiction to obtain interim relief when deemed necessary
      by such court to preserve the status quo or prevent irreparable injury
      pending resolution by arbitration of the actual dispute between the
      parties.{`\n`}
    </TermsText>

    <TermsText>
      The prevailing party will be entitled to receive from the non-prevailing
      party its costs relating to the arbitration proceeding including but not
      limited to, the arbitrator&apos;s fees, attorneys&apos; fees and costs,
      witness fees, transcription fees, etc. and sales and use taxes thereon, if
      any.{`\n`}
    </TermsText>

    <TermsText>
      You and the Company each acknowledges and agrees that it is the intent of
      the parties that arbitration and litigation between the parties will be of
      the parties&apos; individual claims, and that none of their respective
      claims may be arbitrated or litigated on a class-wide basis.
    </TermsText>

    <TermsText>
      {`\n`}Jurisdiction/Disputes{`\n`}
    </TermsText>

    <TermsText>
      This Agreement and all matters arising out of or otherwise relating to
      these terms and conditions shall be governed by the laws in effect in the
      State of Florida, without regard to its conflict of law provisions. You
      and the Company hereby submit to the personal jurisdiction of the state
      and federal courts of the State of Florida for resolution of all disputes.
      You and the Company hereby agree that exclusive venue for any
      litigation/dispute under this Agreement shall be with the state and
      federal courts located in Miami-Dade County, Florida.
    </TermsText>

    <TermsText>
      {`\n`}Class Action Waiver{`\n`}
    </TermsText>

    <TermsText>
      Any proceedings to resolve or litigate any dispute will be conducted
      solely on an individual basis. Neither you nor we will seek to have any
      dispute heard as a class action or in any other proceeding in which either
      party acts or proposes to act in any representative capacity. You and we
      further agree that no arbitration or proceeding will be combined with
      another without the prior written consent of all parties to the affected
      proceedings.
    </TermsText>

    <TermsText>
      {`\n`}Cancellation By User{`\n`}
    </TermsText>

    <TermsText>
      You may cancel your membership at any time by clicking here. You must
      cancel your membership at least twenty-four (24) hours before your monthly
      anniversary date to avoid being charged for another month of membership.
      You hereby agree to be personally liable for any and all charges incurred
      by you until termination of membership for goods or services through your
      use of the Site. Upon our processing of your request to cancel your
      membership, you will no longer have access to the non-public areas of the
      Site to which you were a member.
    </TermsText>

    <TermsText>
      {`\n`}Termination by Us{`\n`}
    </TermsText>

    <TermsText>
      Without limiting other remedies, the Site may immediately issue a warning,
      temporarily suspend, indefinitely suspend, or terminate your access and
      use of the Site and refuse to provide our services to you at any time,
      with or without advance notice, if: (a) we believe that you have breached
      any material term of these Terms and Conditions or the documents it
      incorporates by reference, (b) you fail to pay any amount due by the
      payment due date; (c) we are unable to verify or authenticate any
      information you provide to us; (d) we believe that your actions may cause
      legal liability for you, our users or us; or (e) we decide to cease
      operations or to otherwise discontinue the Site or parts thereof. Further,
      you agree that neither the Company nor any third party acting on our
      behalf shall be liable to you for any termination of your membership or
      access to the Site. You agree that if your account is terminated by us,
      you will not attempt to re-register as a member without prior written
      consent from us.
    </TermsText>

    <TermsText>
      {`\n`}After Termination or Cancellation{`\n`}
    </TermsText>

    <TermsText>
      If you cancel your paid membership with the Site you will lose access to
      the paid portions the Site upon expiration of your paid membership period,
      unless you request your paid access be terminated sooner. Upon expiration
      of your canceled paid membership, your account will automatically revert
      to a free membership, unless you specifically request your free membership
      also be terminated, and you will lose access to all mail and other
      paid-only membership materials. The terms of this Agreement shall survive
      after termination or cancellation, unless stated otherwise.
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
})

export default TermsOfUse
