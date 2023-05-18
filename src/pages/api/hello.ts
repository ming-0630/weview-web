// import { getUserImage } from "@/services/user/services";
// import { useAuthStore } from "@/states/auth-states";

// export const getServerSideProps = async () => {
//   const user = useAuthStore((state) => state.loggedInUser)
//   if (user) {
//     try {
//       const response = await getUserImage(user.id);
//       return {
//         props: {
//           image: response.data
//         },
//       }
//     } catch {
//       return {
//         props: {}
//       };
//     }
//   }

// }
