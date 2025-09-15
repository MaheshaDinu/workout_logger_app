import { useEffect, useState } from "react";
import { Workout } from "@/constants/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { Link } from "expo-router";

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(( ) => {
    const q = query(collection(db, "workouts"), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) =>{
      const workoutsData: Workout[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Workout));
      setWorkouts(workoutsData)
    })
    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 p-4  bg-gray-100">
      <Link href="/addWorkout" asChild>
        <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mb-4">
          <Text className="text-white text-center font-bold text-lg">Add New Workout</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/workout/${item.id}`} asChild>
            <TouchableOpacity className="bg-white p-4 my-2 rounded-lg shadow-sm">
              <Text className="text-lg font-bold text-gray-800">Workout on: {item.date}</Text>
              <Text className="text-gray-600 mt-1">{item.exercises.length} exercises</Text>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No workouts logged yet.</Text>
        }
      />
    </View>
  )
}