import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { Post } from "@/types/types";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite<Post[]>(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>

            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <CustomSearchBar initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No video found"
            subtitle="No video found for this search input"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
