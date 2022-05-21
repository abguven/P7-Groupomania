// ERROR MESSAGES 
module.exports = Object.freeze({


  // Controllers

  // Posts
  ERR_NO_POST_FOUND_FOR_USER: "Aucune publication retrouvé pour cet utilisateur",
  ERR_NO_POST_FOUND: "Aucune publication avec cet identifiant",
  ERR_DB_UPDATE_ERROR: "Erreur de mise à jour de la base de données",



  // Users
  ERR_EMAIL_NOT_FOUND: "Email n'existe pas dans la base de données",
  ERR_INCORRECT_PASSWORD: "Mot de passe erroné",
  ERR_USER_NOT_FOUND: "Utilisateur n'existe pas",
  ERR_ENTER_A_VALID_EMAIL: "Veuillez saisir une adresse email valide",
  ERR_ENTER_AN_EMAIL: 'Veuillez saisir une adresse email',
  ERR_INVALID_LIKE_ARGUMENT: "Argument non valable pour 'like' ",
  ERR_ALREADY_LIKED_THIS_POST: "Cet utilisateur a déjà aimé ce post",
  ERR_CANT_UNLIKE: "Cet utilisateur a déjà retiré sans like ou n'a jamais aimé cette publication",


  // Multer
  ERR_FILE_VALIDATION_ONLY_FOLLOWING_TYPES_ALLOWED: "Vous ne pouvez télécharger que les fichiers de types suivants : ",

  // Token
  ERR_TOKEN_ABSENT: "Token d'authorisation manquant",
  ERR_INVALID_USER_ID: "ID d'utilisateur non valable",
  ERR_AUTH_ERROR_GENERAL: "Erreur d'authentification",
  ERR_NOT_AUTHORISED_FOR: "Vous n'êtes pas autorisé à effectuer cette opération",


  // SUCCESS MESSAGES
  MSG_AUTH_SUCCEEDED: "Authentification réussie",
  MSG_USER_DELETED: "Utilisateur a bien été supprimée",
  MSG_POST_DELETED: "Publication a bien été supprimée",
  MSG_LISTENING_ON_PORT: "Serveur est actif sur le port : ",
  MSG_LIKE_OK: "Mise à jour de like avec succes"
});