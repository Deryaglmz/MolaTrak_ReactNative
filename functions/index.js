const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteUser = functions.https.onCall((data, context) => {
    // if (!context.auth) {
    //     throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    // }
    //
    // const uid = context.auth.uid;
    // return admin.auth().getUser(uid)
    //     .then(userRecord => {
    //         if (userRecord.customClaims && userRecord.customClaims.admin === true && userRecord.uid !== data.uid) {
    //             return admin.auth().deleteUser(data.uid);
    //         } else {
    //             throw new functions.https.HttpsError('permission-denied', 'Only admins can invoke this function.');
    //         }
    //     })
    //     .catch(error => {
    //         throw new functions.https.HttpsError('internal', error.message);
    //     });

    return admin.auth().deleteUser(data.uid);
});


exports.setAdminRole = functions.https.onCall((data, context) => {
    // Check if request is made by an authenticated user
    // if (!context.auth) {
    //     throw new functions.https.HttpsError('unauthenticated', 'The function must be called by an authenticated user.');
    // }

    // This requires the requester to already have custom claims set up
    // if (context.auth.token.admin !== true) {
    //     throw new functions.https.HttpsError('permission-denied', 'Only admins can assign admin role.');
    // }

    const uid = data.uid;
    return admin.auth().setCustomUserClaims(uid, {admin: true})
        .then(() => {
            return {message: `Başarılı! ${uid} has been made an admin.`};
        })
        .catch(error => {
            throw new functions.https.HttpsError('internal', error.message);
        });
});

exports.createUser = functions.https.onCall(async (data, context) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'The function must be called with two arguments "email" and "password".'
        );
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        return { uid: userRecord.uid };
    } catch (error) {
        console.log(error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});


