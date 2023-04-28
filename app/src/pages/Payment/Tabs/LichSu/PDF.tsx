import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import Bill from "../../../../models/bill.model";

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


// Create Document Component
const MyDocument = (data: Bill) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{data.amountMoney}</Text>
      </View>
      <View style={styles.section}>
        <Text>lịch sử thanh toán</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
