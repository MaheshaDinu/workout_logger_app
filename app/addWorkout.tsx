// import { Exercise } from "@/constants/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Workout } from "@/constants/types";
import { Alert, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";

type Exercise = {
  name: string | number;
  sets: number;
  reps: number;
  weight: number;
};
export default function AddWorkoutScreen(){
    const router  = useRouter()

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [exercises, setExercises] = useState<Exercise[]>([{ name: '', sets: 0, reps: 0, weight: 0 }]);
    const [notes, setNotes] = useState('');

    const handleExerciseChange = (index: number, field: keyof Exercise, value:  number | string ) => {
        const newExercise = [...exercises];
        if(typeof value === "number"){
            newExercise[index][field] = value;
        }
        
        setExercises(newExercise);
    }

    const addExerciseField = () => {
        setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);
    }

    const handleSaveWorkout = async () => {
        if(exercises.some(ex => !ex.name)){
            Alert.alert("Error", "Please fill in all exercise names.");
            return;
        }
        try {
            await addDoc(collection(db, "workouts"), { date, exercises, notes});
            Alert.alert("Success", "Workout added successfully!");
            router.back();
        } catch (error){
            Alert.alert("Error", "There was an error saving the workout.");
            console.error("Error adding document: ", error);
        }
    };

    return (
        <ScrollView className="flex-1 p-5 bg-gray-50">
             <Text className="text-base mb-1 text-gray-600">Date</Text>
             <TextInput className="bg-white h-12 border border-gray-300 mb-4 px-3 rounded-md" value={date} onChangeText={setDate} />

             {exercises.map((exercise, index) => (
                <View key={index} className="mb-5 p-4 border border-gray-200 rounded-lg bg-white">
                <Text className="text-xl font-bold mb-3 text-gray-800">Exercise {index + 1}</Text>
                <TextInput className="h-12 bg-gray-100 border border-gray-300 mb-3 px-3 rounded-md" placeholder="Exercise Name" value={exercise.name.toString()} onChangeText={(val) => handleExerciseChange(index, 'name', val)} />
                <TextInput className="h-12 bg-gray-100 border border-gray-300 mb-3 px-3 rounded-md" placeholder="Sets" value={exercise.sets.toString()} onChangeText={(val) => handleExerciseChange(index, 'sets', val)} keyboardType="numeric" />
                <TextInput className="h-12 bg-gray-100 border border-gray-300 mb-3 px-3 rounded-md" placeholder="Reps" value={exercise.reps.toString()} onChangeText={(val) => handleExerciseChange(index, 'reps', val)} keyboardType="numeric" />
                <TextInput className="h-12 bg-gray-100 border border-gray-300 mb-3 px-3 rounded-md" placeholder="Weight (kg)" value={exercise.weight.toString()} onChangeText={(val) => handleExerciseChange(index, 'weight', val)} keyboardType="numeric" />
                </View>
                ))
            }
            <TouchableOpacity className="bg-gray-200 p-3 rounded-lg items-center mb-4" onPress={addExerciseField}>
                <Text className="font-bold text-gray-700">Add Another Exercise</Text>
            </TouchableOpacity>

            <Text className="text-base mb-1 text-gray-600">Notes</Text>
            <TextInput className="bg-white h-24 border border-gray-300 mb-6 p-3 rounded-md" placeholder="Felt strong today..." value={notes} onChangeText={setNotes} multiline />

            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg items-center mb-10" onPress={handleSaveWorkout}>
                <Text className="text-white font-bold text-lg">Save Workout</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}