import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import ProgressDialog from "react-native-progress-dialog";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'moment/locale/it';
moment.locale('it');

const EditProductScreen = ({ navigation, route }) => {
  const { product, authUser } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Updating...");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [imageSend, setImageSend] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [link, setLink] = useState("");
  const [data, setData] = useState(product.data ? product.data : "");
  const [dataScadMod, setDataScadMod] = useState(new Date(product?.data && product.data));
  const [luogo, setLuogo] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("x-auth-token", authUser.token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: title,
    sku: sku,
    price: price,
    image: imageSend,
    description: description,
    category: category,
    quantity: quantity,
    link: link,
    data: dataScadMod,
    luogo: luogo,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const upload = async (image, imageName) => {
    console.log("upload-F:", image);
  
    try {
      const formdata = new FormData();
      formdata.append("photos", {
        uri: image,
        name: imageName,
        type: mime.lookup(imageName),
      });
  
      const ImageRequestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
  
      const response = await fetch(
        network.serverip + "/photos/upload",
        ImageRequestOptions
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("error", error);
    }
  };

  //Method for selecting the image from device gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      const selectedAsset = result.assets[0];
      const imageName = selectedAsset.uri.split('/').pop();
      setImage(selectedAsset.uri)
      setImageSend(imageName);
      upload(selectedAsset.uri, imageName);
    }
  };

  //Method for imput validation and post data to server to edit product using API call
  const editProductHandle = () => {
    setIsloading(true);
    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (price == 0) {
      setError("Please enter the product price");
      setIsloading(false);
    } else if (quantity <= 0) {
      setError("Quantity must be greater then 1");
      setIsloading(false);
    } else if (image == null) {
      setError("Please upload the product image");
      setIsloading(false);
    } else {
      console.log(`${network.serverip}"/update-product?id=${product._id}"`);
      fetch(
        `${network.serverip}/update-product?id=${product._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            setIsloading(false);
            setError(result.message);
            setPrice("");
            setQuantity("");
            setSku("");
            setTitle("");
          }
        })
        .catch((error) => {
          setIsloading(false);
          setError(error.message);
          console.log("error", error);
        });
    }
  };

  // set all the input fields and image on initial render
  useEffect(() => {
    setImage(`${network.serverip}/uploads/${product?.image}`);
    setImageSend(product?.image);
    setTitle(product.title);
    setLink(product.link ? product.link : "");
    setData(product.data ? product.data : "");
    setSku(product.sku);
    setQuantity(product?.quantity?.toString());
    setPrice(product?.price?.toString());
    setDescription(product.description);
    setLuogo(product?.luogo);
    setCategory(product?.category);
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setData(date);
    hideDatePicker();
  };

  const [show, setShow] = useState(false)
  const onChangeDate = (event, selected) => {
    setShow(false)
    if (event.type === 'set') {
      setDataScadMod(selected);
      console.log(selected);
    } else if (event.type === 'dismissed') {
      return
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={label} />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.replace("viewproduct", { authUser: authUser });
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Modifica Prodotto</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Modifica i dettagli del prodotto</Text>
        </View>
      </View>
      <CustomAlert message={error} type={"error"} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            {image ? (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <AntDesign name="pluscircle" size={50} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>
          <CustomInput
            value={sku}
            setValue={setSku}
            placeholder={"SKU"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Titolo"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={link}
            setValue={setLink}
            placeholder={"Link negozio"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          {/*<CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Prezzo"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
            />*/}
          <CustomInput
            value={quantity}
            setValue={setQuantity}
            placeholder={"Quantità"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={description}
            setValue={setDescription}
            placeholder={"Descrizione"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={luogo}
            setValue={setLuogo}
            placeholder={"Seleziona Luogo"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <Text style={{
            fontSize: 22,
            marginTop: 26,
            marginBottom: 10,
            fontWeight: '500',
            color: colors.muted,
            textAlign: 'center',
          }}>Modifica la data</Text>
          {show && <DateTimePicker
            value={dataScadMod && dataScadMod}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />}
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Modifica"} onPress={editProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    //flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
    paddingTop: 40,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    //flexDirecion: "row",
    padding: 5,
    marginBottom: 20,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
