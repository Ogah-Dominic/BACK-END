const familymodel = require('../MODEL/model')
const fs = require('fs');


// create profile
const createProfile = async ( req, res ) => {
    const { fatherName, motherName,children } = req.body;
    const familyProfile = new familymodel( {
            fatherName,
            motherName,
            children,
            pictures: req.files["pictures"][0].filename
        })
    try {
        const savedProfile = await familyProfile.save();
        if ( !savedProfile ) {
            res.status( 400 ).json( {
                message: "Profile not saved."
            })
        } else {
            res.status( 201 ).json( {
                message: "Profile created successfully",
                data: savedProfile
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// get all profiles
const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familymodel.find();
        if ( profiles.length === 0 ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                message: "Profiles",
                data: profiles,
                totalProfile: profiles.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}
// get a profile
const getProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familymodel.findById( profileId );
    try {
        if ( !profile) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// updating profile
const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familymodel.findById( profileId );
    try {
        const { fatherName, motherName, children } = req.body;
        const bodyData = {
            fatherName: fatherName || familyProfile.fatherName,
            motherName: motherName || familyProfile.motherName,
            children: children || familyProfile.children,
            pictures: familyProfile.pictures
        }

        if ( req.files && req.files[ "pictures" ] ) {
            const oldPicturesPath = `uploads/${ familyProfile.pictures }`
            if ( fs.existsSync( oldpicturesPath ) ) {
                fs.unlinkSync(oldPicturesPath)
            }
            bodyData.pictures = req.files.pictures[ 0 ].filename;
        }
        const newPictures = await familymodel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newPictures ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newPictures
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// remove a profile
const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familymodel.findById( profileId );
    try {
            const oldPicturesPath = `uploads/${ profile.pictures }`
            if ( fs.existsSync( oldPicturesPath ) ) {
                fs.unlinkSync( oldPicturesPath )
            }
        const deletedProfile = await familymodel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


module.exports = {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
}