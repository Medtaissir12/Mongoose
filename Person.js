// define a schema for the Person model
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// create a Person model based on the personSchema
const Person = mongoose.model("Person", personSchema);
