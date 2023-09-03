import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import { fetchListCategories, fetchRecipes } from "../services/GetCategories";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [resep, setResep] = useState([])

  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setResep([]);
  }

  const getCategories = async () => {
    try {
      const response = await fetchListCategories()
      if (response && response.data) {
        setCategories(response?.data?.categories)
      }
    } catch (error) {
        console.log("err", error.message);
    }
  }

  const getRecipes = async (category="Beef") => {
    try {
      const response = await fetchRecipes(category)
      if (response && response.data) {
       setResep(response?.data?.meals)
      }
    } catch (error) {
        console.log("err", error.message);
    }
  }


    return (
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="space-y-6 pt-14"
        >
          {/* Avatar dan icon bel */}
          <View className="mx-4 flex-row justify-between items-center mb-2">
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{ height: hp(5), width: hp(5.5) }}
            />
            <BellIcon size={hp(4)} color="gray" />
          </View>

          {/*  greetings dan take line */}
          <View className="mx-4 space-y-2 mb-2">
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
              Hello, Hadi!
            </Text>
            <View>
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-semibold text-neutral-600"
              >
                Make your own food,{" "}
              </Text>
            </View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              stay at, <Text className="text-sky-400">home</Text>{" "}
            </Text>
          </View>
          <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </View>
          {/* Kategori*/}

          <View>
           { categories?.length > 0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} handleChangeCategory={handleChangeCategory}/>}
          </View>

          {/* Resep */}
          <View>
            <Recipes meals={resep} categories={categories}/>
          </View>
        </ScrollView> 
      </View>
    );
  }

export default HomeScreen;
