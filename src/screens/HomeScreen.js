import React, {useEffect} from "react";
import {StyleSheet, View, FlatList} from "react-native";
import {Text, useTheme} from "react-native-paper";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../actions/postActions";
import {SafeAreaView} from "react-native-safe-area-context";
import PostHomeCard from "../components/PostHomeCard";

const HomeScreen = () => {
  const {colors} = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <Text
        variant="displaySmall"
        style={{color: colors.text, marginLeft: 15, marginTop: 10}}
      >
        Outfy
      </Text>
      <FlatList
        data={posts}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <PostHomeCard item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    alignItems: "center",
  },
});

export default HomeScreen;
