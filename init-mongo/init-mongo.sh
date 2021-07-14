mongo -- "admin" <<EOF
    db.createUser({user: "$MONGO_INITDB_USERNAME", pwd: "$MONGO_INITDB_PASSWORD", roles: ["readWrite"]});
EOF

mongo -u "$MONGO_INITDB_USERNAME" -p "$MONGO_INITDB_PASSWORD" <<EOF
    use accounts;
EOF