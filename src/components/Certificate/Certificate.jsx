/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    // padding: 30,
    // paddingTop: 40
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "800",
    height: "620",
    opacity: 0.2,
  },
  content: {
    position: "relative", 
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontSize: 40,
    color: "#F73910",
  },
  title2: {
    fontSize: 40,
    color: "#F73910",
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    marginBottom: 20,
  },
  studentId: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    margin: "auto",
  },
  name: {
    fontSize: 30,
    fontWeight: 700,
  },
});

const Certificate = ({ courseName, name }) => {
  console.log(courseName, name);
  return (
    <Document>
      <Page size={[800, 620]} style={styles.page}>
        {/* Background Image */}
        <Image
          src="https://i.postimg.cc/nzKpGvRX/certificate-background.jpg"
          style={styles.backgroundImage}
        />
        {/* Content */}
        <View style={styles.content}>
			
          {/* first part */}
          <View style={styles.section}>
            {/* content */}
            <View>
              <Text style={styles.title}>CERTIFICATE</Text>
              <Text style={styles.title2}>OF ACHIEVEMENT</Text>
              <Text style={styles.text}>is awarded to</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            {/* logo image */}
            <View>
              <Image
                style={{ width: 205, height: 200 }}
                src={
                  "https://i.postimg.cc/1zKS45Ng/614-6141651-transpar…ucation-logo-hd-png-download-removebg-preview.png"
                }
              />
              <Text style={styles.studentId}>WEB8-0212</Text>
            </View>
          </View>

          {/* second part */}
          <View style={{ marginTop: 30, marginLeft: 30, marginRight: 30 }}>
            <Text style={styles.text}>
              for the successful completion of the <Text style={{fontWeight: "bold"}}>{courseName} </Text>
               Course
            </Text>
            <Text style={styles.text}>
              with a rigorous amount of JavaScript, HTML, CSS, and React and
              applied these skills to build several projects.
            </Text>
            <Text style={styles.text}>
              You did it, and we are proud of you!
            </Text>
          </View>

          {/* third part */}
          <View style={{ marginTop: 60 }}>
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  src={
                    "https://i.postimg.cc/1zKS45Ng/614-6141651-transpar…ucation-logo-hd-png-download-removebg-preview.png"
                  }
                />
                <Text style={{ marginLeft: 15, fontSize: 20 }}>
                  RayhanWorld Softwares
                </Text>
              </View>
              <View>
                <Image
                  style={{ width: 160, height: 50 }}
                  src={
                    "https://i.postimg.cc/TPw5tP9g/Oprah-Winfrey-Signature-1.png"
                  }
                />
                <Text
                  style={{ borderTop: 1, paddingTop: 10, marginBottom: 10 }}
                >
                  Md. Rayhan Kibria Ronee
                </Text>
                <Text style={styles.text}>CEO, RayhanWorld Softwares</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
