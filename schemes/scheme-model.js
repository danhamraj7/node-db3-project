const db = require("../data/db-config");
module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

// function findSteps(id) {
//   return db("steps")
//     .join("schemes", "scheme_id", "=", "steps.scheme_id")
//     .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
//     .where({ "schemes.id": " id" })
//     .orderBy("step_number", "asc")
//     .then(steps => {
//       if (steps) {
//         return steps;
//       } else {
//         return null;
//       }
//     });
// }

function findSteps(scheme_Id) {
  return db("steps as st")
    .join("schemes as sch", "st.scheme_id", "sch.id")
    .select(
      "sch.id as scheme_Id",
      "sch.scheme_name as Scheme_Name",
      "st.id as Step_Id",
      "st.step_number as Step_Number",
      "st.instructions as Step_Instructions"
    )
    .where({ scheme_Id: scheme_Id });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addStep(step) {
  db("steps")
    .insert(step, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(scheme, id) {
  return db("schemes").where("id", Number(id)).update(scheme);
}

function remove(id) {
  return db("schemes").where("id", Number(id)).del();
}
