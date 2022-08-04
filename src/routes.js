// import PrivateRoute from "components/PrivateRoute";
// import AuthLayout from "pages/auth";
// import Login from "pages/auth/Login";
// import Register from "pages/auth/Register";
// import Home from "pages/Home";
// import MainLayout from "pages/layout";
// import Logout from "pages/logout";
// import ProfileLayout from "pages/profile";
// import ProfilePost from "pages/profile/posts";
// import ProfileTagged from "pages/profile/tagged";


// const routes = [
//   {
//     path: "/",
//     element: <MainLayout />,
//     auth: true,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       },
//       {
//         path: 'logout',
//         element: <Logout />
//       },
//       {
//         path: ':username',
//         element: <ProfileLayout />,
//         children: [
//           {
//             index: true,
//             element: <ProfilePost />
//           },
//           {
//             path: 'tagged',
//             element: <ProfileTagged />
//           }

//         ]
//       }

//     ]
//   },
//   {
//     path:  "/auth",
//     element: <AuthLayout />,
//     children: [
//         {
//             path: 'login',
//             element: <Login />
//         },
//         {
//           path: "register",
//           element: <Register />
//         }
//     ]
//   },
  
// ];

// const authCheck = routes => routes.map(route => {
// 	if (route?.auth) {
// 		route.element = <PrivateRoute>{route.element}</PrivateRoute>
// 	}
// 	if (route?.children) {
// 		route.children = authCheck(route.children)
// 	}
// 	return route
// })

// export default authCheck(routes)


import PrivateRoute from "components/PrivateRoute";
import AuthLayout from "pages/auth";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Home from "pages/Home";
import MainLayout from "pages/layout";
import Logout from "pages/logout";
import ProfileLayout from "pages/profile";
import ProfilePost from "pages/profile/posts";
import ProfileTagged from "pages/profile/tagged";

const routes = [
	{
		path: '/',
		element: <MainLayout />,
		auth: true,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'logout',
				element: <Logout />
			},
			{
				path: ':username',
				element: <ProfileLayout />,
				children: [
					{
						index: true,
						element: <ProfilePost />
					},
					{
						path: 'tagged',
						element: <ProfileTagged />
					}
				]
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	}
]

const authCheck = routes => routes.map(route => {
	if (route?.auth) {
		route.element = <PrivateRoute>{route.element}</PrivateRoute>
	}
	if (route?.children) {
		route.children = authCheck(route.children)
	}
	return route
})

export default authCheck(routes)