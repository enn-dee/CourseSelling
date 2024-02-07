import React, { useEffect, useState } from "react";

function Courses() {
  const [course, setCourses] = useState([]);
  let count = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCourses(data.courses);
            // console.log("data from server: ", data.courses);
          });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {course.map((c) => {
        return (
          <div key={c.id}>
            <h2>
              {" "}
              {++count} {c.title}
            </h2>
            <p>{c.description} </p>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
