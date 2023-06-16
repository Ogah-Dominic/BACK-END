


const express = require( 'express' );
const router = express.Router();
const {upload} = require('../MULTER/multer')
const { 
      createProfile,
      getProfiles,
      getProfile, 
      updateProfile, 
      deleteProfile} = require( '../CONTROLLER/controller' )

router.post( '/profiles', upload, createProfile )
// router.get( '/profiles', getProfiles );
// router.get( '/profiles/:id', getProfile );
// router.put( '/profiles/:id', updateProfile );
// router.delete( '/profiles/:id', deleteProfile );


module.exports = router;