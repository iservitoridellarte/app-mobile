import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/Splash";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import UpdatePasswordScreen from "../screens/profile/UpdatePasswordScreen";
import MyAccountScreen from "../screens/profile/MyAccountScreen";
import AddProductScreen from "../screens/admin/AddProductScreen";
import DashboardScreen from "../screens/admin/DashboardScreen";
import ViewProductScreen from "../screens/admin/ViewProductScreen";
import Tabs from "./tabs/Tabs";
import CartScreen from "../screens/user/CartScreen";
import CheckoutScreen from "../screens/user/CheckoutScreen.js";
import OrderConfirmScreen from "../screens/user/OrderConfirmScreen";
import ProductDetailScreen from "../screens/user/ProductDetailScreen";
import EditProductScreen from "../screens/admin/EditProductScreen";
import ViewOrdersScreen from "../screens/admin/ViewOrdersScreen";
import ViewOrderDetailScreen from "../screens/admin/ViewOrderDetailScreen";
import MyOrderScreen from "../screens/user/MyOrderScreen";
import MyOrderDetailScreen from "../screens/user/MyOrderDetailScreen";
import ViewCategoryScreen from "../screens/admin/ViewCategoryScreen";
import AddCategoryScreen from "../screens/admin/AddCategoryScreen";
import ViewUsersScreen from "../screens/admin/ViewUsersScreen";
import CategoriesScreen from "../screens/user/CategoriesScreen";
import EditCategoryScreen from "../screens/admin/EditCategoryScreen";
import MyWishlistScreen from "../screens/profile/MyWishlistScreen";
import SetTessera from "../screens/auth/SetTessera";
import ViewUserScreen from "../screens/admin/ViewUserScreen";
import ViewTessereScreen from "../screens/admin/ViewTessereScreen.js";
import AddTesseraScreen from "../screens/admin/AddTesseraScreen.js";
import EditTesseraScreen from "../screens/admin/EditTesseraScreen.js";
import AddUser from "../screens/admin/AddUser.js";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgetpassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="tesserareg" component={SetTessera} />
        <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="mywishlist" component={MyWishlistScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="addproduct" component={AddProductScreen} />
        <Stack.Screen name="viewproduct" component={ViewProductScreen} />
        <Stack.Screen name="addtessera" component={AddTesseraScreen} />
        <Stack.Screen name="edittessera" component={EditTesseraScreen} />
        <Stack.Screen name="viewtessere" component={ViewTessereScreen} />
        <Stack.Screen name="viewuser" component={ViewUserScreen} />
        <Stack.Screen name="editproduct" component={EditProductScreen} />
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} />
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="vieworder" component={ViewOrdersScreen} />
        <Stack.Screen
          name="vieworderdetails"
          component={ViewOrderDetailScreen}
        />
        <Stack.Screen name="myorder" component={MyOrderScreen} />
        <Stack.Screen name="myorderdetail" component={MyOrderDetailScreen} />
        <Stack.Screen name="viewcategories" component={ViewCategoryScreen} />
        <Stack.Screen name="addcategories" component={AddCategoryScreen} />
        <Stack.Screen name="editcategories" component={EditCategoryScreen} />
        <Stack.Screen name="viewusers" component={ViewUsersScreen} />
        <Stack.Screen name="adduser" component={AddUser} />
        <Stack.Screen name="categories" component={CategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
