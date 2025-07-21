/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Text,
  SafeAreaView,
  Platform,
  Button,
  BackHandler,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput, TouchableOpacity
} from "react-native";


import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";


import Icon from "react-native-vector-icons/MaterialIcons";


//import { authSlice } from '../../container/slices/authSlice'
//import { NavService } from '../../navigation/NavService'
//import { EStacks } from '../../constants/appRoutes'
//import { useGetProfileQuery } from '../../container/services/ProfileService'
//import LoadingBar from '../../atoms/LoadingBar'

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const _ = { get };

const Profile = () => {
  const dispatch = useDispatch();

  //const [profile, setProfile] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  //const [genderNotSet, setGenderNotSet] = useState(true);
  const [userData, setUserData] = useState<any>();
  const [loading, setIsLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [isDateOfBirthEdit, setIsDateOfBirthEdit] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [inEditMode, setinEditMode] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [day, setDay]: any = useState("");
  const [month, setMonth]: any = useState("");
  const [year, setYear]: any = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profilePhoto, setProfilePhoto] = useState({
    uri: "",
    name: "",
    type: "image/jpeg",
  });
  // const { currentAddress } = useSelector((state: any) => ({ ...state }));
  // const [phoneNumber, setPhoneNumber] = useState<any>();
  const nav = useNavigation();
  const isFocused = useIsFocused();
  
  const genderData = [
    {
      id: 1,
      title: "Male",
      // img: require('../../assets/Images/boy.png'),
    },
    {
      id: 2,
      title: "Female",
      // img: require('../../assets/Images/girl.png'),
    },
    {
      id: 3,
      title: "Others",
      // img: require('../../assets/Images/gender.png'),
    },
  ];

  useEffect(() => {
    setMainLoading(true);
    const getUserData = async () => {
      const data: any = await getProfile();
      console.log("UserData Profile =====>", data?.data);
      setFullName(data?.data?.fullName);
      setGender(data?.data?.gender);
      console.log("data?.data?.dateofbirth=========>", data?.data?.dateofbirth);
      setDateOfBirth(moment(data?.data?.dateofbirth).format("DD-MM-YYYY"));
      setUserData(data?.data);
      setReferralCode(data?.data?.referralCode);
      setMainLoading(false);
    };

    getUserData();
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    } else {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    }
  }, [isFocused]);

  const handleBackButtonClick = () => {
    nav.goBack();
    return true;
  };
  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

  //console.log("priogikl", profilePhoto);
  const pickImage = async () => {
    if (Platform.OS === "android") {
      const isCameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (isCameraGranted) {
        const image: any = await launchCamera({
          mediaType: "photo",
          quality: 1,
        });
        console.log("imgae uis", image);

        setProfilePhoto({
          uri: image.assets[0].uri,
          name: image.assets[0].fileName,
          type: image.assets[0].type,
        });
      }
    }
  };

  const renderUser = () => (
    <TouchableOpacity
      onPress={() => {
        pickImage();
      }}
      style={{
        backgroundColor: "white",
        height: 125,
        width: 125,
        marginTop: 20,
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      {userData?.userData?.profile_photo ? (
        <Image
          style={{
            alignSelf: "center",

            borderRadius: 10,
          }}
          height={120}
          width={120}
          source={{
            uri: profilePhoto?.uri
              ? profilePhoto.uri
              : returnImageString(userData?.userData?.profile_photo),
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 125,
            width: 125,
            flexDirection: "row",
          }}
        >
          <SvgXml
            xml={Profilephoto}
            height={125}
            width={125}
            style={{
              alignSelf: "center",
              borderColor: "green",
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  // const renderUserDetail = (value: string, setValue: any) => (
  //   <TextInput
  //     value={value}
  //     style={{
  //       //paddingTop: 7,
  //       color: COLORS.black,
  //       borderBottomWidth: 1,
  //       borderBottomColor: COLORS.black,
  //       //paddingBottom: 7,
  //       fontWeight: "400",
  //     }}
  //     onChangeText={(e) => setValue(e)}
  //   />
  // );

  // const renderTextInput = (state: any, setState: any) => {
  //   <View>
  //     <TextInput onChangeText={(e) => setState(e)} value={state} />
  //     <TouchableOpacity onPress={() => {}}>
  //       <Text>Ok</Text>
  //     </TouchableOpacity>
  //   </View>;
  // };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <BottomDatePicker
        open={open}
        setOpen={setOpen}
        setMonth={setMonth}
        setYear={setYear}
        setDate={setDate}
        setDay={setDay}
        date={date}
      /> */}
      <View
        style={{
          paddingVertical: 10,
          backgroundColor:COLORS.themeColor,
          //backgroundColor: "red",
          width: wp(100),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          justifyContent: "space-between",
        }}
      >
        {inEditMode ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setinEditMode(false);
              }}
            >
              <Icon name="clear" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 5,
              }}
            >
              Cancel
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                nav.goBack();
              }}
            >
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 5,
              }}
            >
              Profile
            </Text>
          </View>
        )}

        {!inEditMode && (
          <TouchableOpacity
            onPress={() => {
              setinEditMode(true);
            }}
            style={{
              // borderWidth:1,
              // borderColor:"#e9fff9",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              paddingVertical: 2,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "black", fontSize: 14, fontWeight: "500" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mainLoading ? <LoadingComponent /> : null}
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/images/blueProfile.png")}
          style={{
            height: hp(27.5),
            backgroundColor: COLORS.themeColor,
            width: wp(100),
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          {renderUser()}
        </ImageBackground>

        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View
            style={[
              styles.separator,
              { backgroundColor: "#fff", marginVertical: 10 },
            ]}
          />
          <View style={styles.dataContainer}>
            <Text style={{ color: COLORS.black, fontWeight: "500" }}>Name</Text>

            <TextInput
              value={fullName}
              editable={inEditMode}
              style={{
                padding: 0,
                margin: 0,
                borderBottomWidth: inEditMode ? 1 : 0,
                borderBottomColor: COLORS.grey,
                color: COLORS.black,
                fontWeight: "400",
              }}
              onChangeText={(e) => setFullName(e)}
            />
          </View>
          {!inEditMode && (
            <View style={styles.dataContainer}>
              <Text style={{ color: COLORS.black, fontWeight: "500" }}>
                Phone
              </Text>

              <TextInput
                value={userData?.phoneNumber}
                editable={false}
                style={{
                  padding: 0,
                  margin: 0,
                  borderBottomWidth: inEditMode ? 1 : 0,
                  borderBottomColor: COLORS.grey,
                  color: COLORS.black,
                  fontWeight: "400",
                }}
                //onChangeText={(e) => setFullName(e)}
              />
            </View>
          )}

          <View style={styles.dataContainer}>
            <Text style={{ color: COLORS.black, fontWeight: "500" }}>
              Gender
            </Text>

            {inEditMode ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  borderColor: "black",
                }}
              >
                {genderData.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={item?.title}
                      onPress={() => setGender(item.title)}
                      style={{
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: "#e2e2e2",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          height: 13,
                          width: 13,
                          borderRadius: 50,
                          borderColor: "#e2e2e2",
                          borderWidth: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {gender == item.title ? (
                          <View
                            style={{
                              backgroundColor:COLORS.themeColor,
                              borderRadius: 50,
                              height: 8,
                              width: 8,
                            }}
                          />
                        ) : (
                          <View
                            style={{
                              backgroundColor: "#d6d6d6",
                              borderRadius: 50,
                              height: 8,
                              width: 8,
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ color: "black", fontWeight: "500" }}>
                        {" "}
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              // <Text
              //   style={{
              //     color: "black",
              //     fontSize: 14,
              //     fontWeight: "400",
              //   }}
              //   //editable={inEditMode}
              // >
              //   {gender}
              // </Text>
              <TextInput
                value={gender}
                editable={false}
                style={{
                  padding: 0,
                  margin: 0,
                  borderBottomWidth: inEditMode ? 1 : 0,
                  borderBottomColor: COLORS.grey,
                  color: COLORS.black,
                  fontWeight: "400",
                }}
                //onChangeText={(e) => setFullName(e)}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.dataContainer}
            activeOpacity={1}
            onPress={() => {
              inEditMode && setOpen(!open);
            }}
          >
            <Text style={{ color: COLORS.black, fontWeight: "500" }}>
              D.O.B
            </Text>

            <TextInput
              value={
                month == ""
                  ? dateOfBirth
                  : day != "" && month != "" && year != ""
                  ? `${day}-${month <= 9 ? "0" + month : month}-${year}`
                  : ""
              }
              editable={false}
              placeholder="DD - MM - YYYY"
              style={{
                padding: 0,
                margin: 0,
                borderBottomWidth: inEditMode ? 1 : 0,
                borderBottomColor: COLORS.grey,
                color: COLORS.black,
                fontWeight: "400",
              }}
            />
          </TouchableOpacity>
          {!inEditMode && (
            <View style={styles.dataContainer}>
              {userData?.referralCode && (
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: "500",
                    }}
                  >
                    Referral{copiedText}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Text
                      style={{
                        color: COLORS.black,
                        borderBottomColor: COLORS.black,
                        fontWeight: "400",
                        width: "90%",
                      }}
                    >
                      {referralCode}
                    </Text> */}
                    <TextInput
                      value={referralCode}
                      editable={false}
                      style={{
                        padding: 0,
                        margin: 0,
                        borderBottomWidth: inEditMode ? 1 : 0,
                        borderBottomColor: COLORS.grey,
                        color: COLORS.black,
                        fontWeight: "400",
                        width: "90%",
                      }}
                      //onChangeText={(e) => setFullName(e)}
                    />

                    <TouchableOpacity
                      onPress={copyToClipboard}
                      style={{
                        // height: 30,
                        // width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor:"pink",
                      }}
                    >
                      <Image
                        style={{ height: 17, width: 17, resizeMode: "contain" }}
                        source={require("../assets/images/copy-icon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      {inEditMode && (
        <View style={styles.btnContainer}>
          <MainButton
            title="UPDATE"
            loading={loading}
            onPress={async () => {
              let submitableData = {};
              setIsLoading(true);
              const formData = new FormData();
              if (profilePhoto.uri) {
                const image = await imageUploadAPIFunction({
                  image: profilePhoto,
                });
                submitableData.profile_photo = image;
              }
              if (fullName) {
                submitableData.fullName = fullName;
              }
              if (gender) {
                submitableData.gender = gender;
              }
              if (month) {
                submitableData.dob = `${year}-${
                  month <= 9 ? '0' + month : month
                }-${day}`;
              }
              setGender(gender);
              setinEditMode(false);
              const data = await updateProfile(submitableData);
              console.log(
                "data-------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
                data
              );
              setProfilePhoto({
                uri: "",
                name: "",
                type: "image/jpeg",
              });
              setIsLoading(false);

              setMainLoading(true);
              const profileData: any = await getProfile();
              dispatch(changeProfileData(profileData?.data));
              setUserData(profileData?.data);
              setGender(profileData?.data?.gender);
              setDateOfBirth(
                moment(profileData?.data?.dateofbirth).format("YYYY-MM-DD")
              );
              setMainLoading(false);
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  separator: { height: 1, backgroundColor: "#DADEE0", marginVertical: 15 },
  txtToolbar: { alignSelf: "center" },
  container: {
    height: "100%",
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  profile: {
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    boederWidth: 10,
  },
  txtName: { alignSelf: "center", marginTop: 10 },
  txtUserType: { alignSelf: "center" },
  ratingContainer: { flexDirection: "row", justifyContent: "space-between" },
  imgStar: { height: 20, width: 20 },
  userDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgDetail: { width: 24, height: 24 },
  txtDetail: { marginLeft: 0, marginTop: 10 },
  btnContainer: {
    bottom: 0,
  },
  dataContainer: {
    backgroundColor: "#e9fff9",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
});

export default Profile;