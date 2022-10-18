# Solito + Nativewind + Firebase Auth + TRPC + Prisma
This example repo is based on the solito + nativewind(info below). FULL CREDIT to this amazing creator @nandorojo.

This repo implements firebase auth, trpc, and prisma to make a full stack full platform universal app.

## This may not be feature complete. It is not tested in production. It was created in the process of determining if this stack would fit a specific use case.

I am sharing in case it benefits someone else.

## This uses 3 packages for auth. The firebase web sdk for web clients, the firebase admin sdk for server side auth validation, and react-native-firebase for expo.

<br>

## This approach requires building a custom client for mobile, as react-native-firebase uses native code. The configs for building these dev clients are already setup; however, it is NOT COMPATIBLE WITH EXPO GO.
- I have found using the firebase web sdk for auth in expo to be somewhat unstable/unreliable. It is worth using the native package and building the custom dev cleints.
- This approach also enables email magic links and sms auth methods in expo
- More details at https://rnfirebase.io/
- Converting to using firebase-web for expo would not be complicated. Just remove the react-native-firebase code and use the index.web.ts auth files as index.ts. This would enable expo go compatibility.



## Initialization
- clone the repo.
- cd into the directory
- run yarn to install all dependancies

## You need to load in 3 sets of configs:
- in apps/next, inside a .env file(or setting env vars for wherever you host your server): FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL. These vars come from initializing the firebase ADMIN sdk, not a client sdk! - https://firebase.google.com/docs/admin/setup
- inside apps/expo, there is a folder firebase-expo. This folder needs 2 config files. One for native android, and one for native ios. You obtain from firebase console and create new apps for ios and android, as if using native sdk. Detailed instructions can be found on the react-native-firebase setup page. https://rnfirebase.io/
- packages/api/firebase/index.web.ts : paste in here the firebase web sdk credentials provided by firebase console. https://firebase.google.com/docs/web/setup

All the install is done. Simply follow directions to obtain credentials.

## Other config:
- packages/db: run prisma init, then follow instructions including adding db access link to .env
- packages/api/server/context.ts: This is where you validate a user. checkToken() is called which returns the user details if exists. From here you can determine what data you want to return, such as user object from your DB, permissions, etc. What you return will be inserted into your TRPC router context.
- packages/api/server/trpc: this is where you implement logic to grant access to the protectedProcedure routes, based on the info from context. You can check permissions here, return error if unauthorized. This is separate from context as you might want to use the context info differently in additional procedure types.
- packages/db/index: here you can export additional db calls you want to abstract from the api. These might serve as the base of multiple api routes. Intent is for multiple db access files to exist, such as Users for db access related to users.

## Future Improvement:
- To further improve this, I would implement firebase web sessions in the next web app, and use next middleware to check the session and determine if re-routing is necessary. This should also enable SSR from an auth point of view; however, this opens a new set of issues.
- auth user is stored using a jotai state object. There are better ways of doing this, but this was done to make it easy to change this around from anywhere in the package. Also may need some type correction.
- app/features/auth is a simple login/logout button using hardcoded credentails. This is obviously not ideal. A good sign in and sign out screen would be necessary; however, left blank as there are so many auth methods firebase supports, you may want magic links, sms, etc....
- expo router implementation when it becomes mature.
- there may be some room for simplification in the TRPC implementation, but it was left verbose to enable use of their docs.
- ensure exports from the index.ts in each package does not interfere with nextjs tree shaking.


# Credits :
### Credit fully to the package maintainers of TRPC, solito, prisma, react-native-firebase, and nativewind, for the incredible time, effort, and talent they have contributed to the community. 

This was an exercise for a specific need, hopefully it can help others either get started or make a determination if this stack is right for them.
<br>
Also shoutout to the create-t3-app community and @TheoBr for the inspiration and great explanations as to the benefits of this setup.
### I am not currently using this in production, so if something is missing/incorrect, please let me know or submit a PR / Fork.


# Solito + NativeWind Example Monorepo 🕴

## 🔦 About

This monorepo is a starter for an Expo + Next.js app using [NativeWind](https://nativewind.dev) for its styling & [Solito](https://solito.dev) for navigation.

## 👓 How NativeWind works with Solito

### Fast on every platform

NativeWind lets you use Tailwind while reducing runtime work on every platform.

### iOS and Android

Most approaches to using Tailwind in React Native do something like this at runtime:

```ts
const styles = props.className
  .split(' ')
  .map((className) => makeStyle(className))
  
return <View style={styles} />
```

This means that every component ends up parsing strings to construct predictable style objects.

NativeWind takes a new approach by doing this work upfront with a Babel plugin.

NativeWind turns `className` strings into cached `StyleSheet.create` objects at build time, avoiding the [slow string parsing problem](https://twitter.com/terrysahaidak/status/1470735820915150850?s=20&t=w9VUPwiTFxBkRBHWTtDz1g) of libraries like `styled-components/native`.

Keep in mind that the Babel plugin will get used on iOS/Android only; on Web, we don't need the plugin since we are using `className`.

### Web

On Web, NativeWind uses Next.js' `PostCSS` feature to output CSS StyleSheets.

Which means that **on Web, you're using CSS class names.** 

Yes, that's right. We aren't parsing className strings into objects for React Native Web to use. Instead, we're actually forwarding CSS classnames to the DOM. That means you can get responsive styles, dark mode support, & pseudo-selectors _with server-side rendering support_.

This is finally possible with the release of React Native Web 0.18.

As a result, using NativeWind with React Native doesn't have significant overhead compared to plain old Tailwind CSS in a regular React app.

If you're planning on making a website with Tailwind, why not use Solito with NativeWind? 

You might accidentally make a great native app when you thought you were just making a website.


### Bringing it together

Components are written using the `styled()` higher-order component.

In your app's design system, you can start by building your own UI primitives:

```tsx
// packages/app/design/typography
import { Text } from 'react-native'
import { styled } from 'nativewind'

export const P = styled(Text, 'text-base text-black my-4')
```

Notice that you can set base styles using the second argument of `styled`.

You can then use the `className` prop, just like regular Tailwind CSS:

```tsx
<P className="dark:text-white">Solito + NativeWind</P>
```

Take a look at the [`packages/app/design`](https://github.com/nandorojo/solito/tree/master/example-monorepos/with-tailwind/packages/app/design) folder to see how components are created with ease.

> If you're reading the NativeWind docs, you might find that you can use `className` directly without using `styled`. Since this requires the Babel plugin for all platforms, it won't work with Solito. Be sure to always wrap your components with `styled`.

## 📦 Included packages

- `solito` for cross-platform navigation
- `moti` for animations
- `nativewind` for theming/design (you can bring your own, too)
- Expo SDK 46
- Next.js 12.3
- React Navigation 6

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
    - `design` your app's design system. organize this as you please.
      - `typography` (components for all the different text styles)
      - `layout` (components for layouts)

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
- Expo local dev: `yarn native`
  - Runs `expo start`

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## 🎙 About the creator

### Fernando Rojo

Follow Fernando Rojo, creator of `solito`, on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

### Mark Lawlor

Follow Mark Lawlor, creator of `NativeWind`, on Twitter: [@mark\_\_lawlor](https://twitter.com/mark__lawlor)

## 🧐 Why use Expo + Next.js?

See my talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>