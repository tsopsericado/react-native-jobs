import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import { PopularjobCard } from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const PopularJobs = () => {
  const router = useRouter();
  const [selectedJob, SetSelectedJob] = useState() 


  const { data, isLoading, error } = useFetch
  ( 'search', {
    query: 'React developer',
    num_pages: 1
  }
   
  )

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    SetSelectedJob(item.job_id)
  } 


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went Wrong</Text>
        ) : (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={({ item }) => <PopularJobs item={item} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
