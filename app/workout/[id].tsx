import { Workout } from "@/constants/types";
import { db } from "@/services/firebase";
import { useLocalSearchParams, Router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextComponent, View } from "react-native";

export default function WorkoutDetailsScreen(){
    const { id } = useLocalSearchParams();

    const [workout, setWorkout] = useState<Workout | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!id) return;
        const fetchWorkout = async () => {
            const docRef = doc(db, "workouts", id as string)
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setWorkout({ id: docSnap.id, ...docSnap.data()} as Workout)
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        }
        fetchWorkout();
    }, [id]);

    if(loading){
        return(
            <ActivityIndicator size="large" className="mt-5" />
        )
    }

    if(!workout){
        return(
            <Text className="text-center mt-5 text-red-500">Workout not found.</Text>
        )
    }

    return (
        <View className="flex-1 p-5 bg-gray-50">
            <Text className="text-3xl font-bold text-gray-800">Date: {workout.date}</Text>
            {workout.notes ? <Text className="text-gray-600 italic my-3 text-base">Notes: {workout.notes}</Text> : null}

            <Text className="text-2xl font-bold mt-6 mb-3 text-gray-800">Exercises:</Text>
            {workout.exercises.map((exercise, index) => (
                <View key={index} className="bg-white p-4 rounded-lg shadow-sm mb-3">
                    <Text className="text-xl font-bold text-blue-600">{exercise.name}</Text>
                    <Text className="text-gray-700 mt-1 text-base">Sets: {exercise.sets} | Reps: {exercise.reps} | Weight: {exercise.weight} kg</Text>
                </View>
                ))
            }
        </View>
    )
}