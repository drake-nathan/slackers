/* eslint-disable camelcase */

const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;

// const client = new Client(parser(process.env.DATABASE_URL));
const pool = new Pool(parser(process.env.DATABASE_URL));

const strings = {};

const isAllowed = async (userId, conversationId) => {
  const query = {
    text: `
    SELECT 
      conversation_id
    FROM user_conversation 
    WHERE user_id = $1;
    `,
    values: [userId],
  };

  try {
    const res = await pool.query(query);
    const conversations = res.rows.map((row) => row.conversation_id);
    if (conversations.includes(conversationId)) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// ------------- QUERIES GO HERE---------------------

strings.allUsers = () => `SELECT * FROM slacker_users`;
strings.oneUser = (email) => ({
  text: `SELECT * FROM slacker_users WHERE email = $1`,
  values: [email],
});
strings.userById = (id) => ({
  text: `SELECT * FROM "slacker_users" WHERE user_id = $1`,
  values: [id],
});

// ---------------------------------------------------

const getAllChannels = (req, res, next) => {
  const query = {
    text: `
    SELECT *
    FROM conversation;
  `,
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const addNewChannel = (req, res, next) => {
  // body should have info
  const { name, description } = req.body;

  const query = {
    text: `
    INSERT INTO conversation (name, description, type, private, createddate)
      VALUES ($1, $2, $3, $4, Now()) RETURNING conversation_id, name, description;
    `,
    // eslint-disable-next-line camelcase
    values: [name, description, 'channel', true],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const addNewDm = (req, res) => {
  // eslint-disable-next-line
  const { user_id } = req.user;
  const { userToDm } = req.body;

  const query1 = `
      INSERT INTO conversation (type, private, createddate)
      VALUES ('dm', true, Now()) RETURNING conversation_id;
    `;

  const query2 = {
    text: `
      INSERT INTO user_conversation (user_id, conversation_id)
      VALUES ($1, $3), ($2, $3);
    `,
    values: [user_id, userToDm],
  };

  pool.query(query1, (err, result1) => {
    if (err) {
      res.send(500, `DB error ${err}`);
    } else {
      query2.values.push(result1.rows[0].conversation_id);
      pool.query(query2, (err, result2) => {
        if (err) {
          res.send(500, `DB error ${err}`);
        } else {
          pool.query(strings.userById(userToDm), (err, result3) => {
            if (err) {
              res.send(500, `DB error ${err}`);
            } else {
              res.send({
                name: result3.rows[0].name,
                conversation_id: result1.rows[0].conversation_id,
              });
            }
          });
        }
      });
    }
  });
};

const createChannelUser = (req, res, next) => {
  const { conversationId } = req.params;
  const { userId } = req.body;
  const query = {
    text: `
    INSERT INTO user_conversation (user_id, conversation_id)
      VALUES ($1, $2) RETURNING *;
    `,
    values: [userId, parseInt(conversationId)],
  };
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getAllUsers = (req, res, next) => {
  const query = {
    text: `
    SELECT
      slacker_users.user_id,
      slacker_users.name,
      slacker_users.image_url
    FROM
      slacker_users
    `,
  };
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getNonConvoUsers = (req, res, next) => {
  const { conversationId } = req.params;

  const query = {
    text: `
      With table_1 as (
        SELECT DISTINCT
                slacker_users.user_id
              FROM
                slacker_users
              INNER JOIN user_conversation ON user_conversation.user_id = slacker_users.user_id
            WHERE conversation_id = $1
      )
        
      SELECT DISTINCT
        slacker_users.user_id,
        slacker_users.name,
        slacker_users.image_url
      FROM
        slacker_users
      Left join table_1 on table_1.user_id = slacker_users.user_id
      Where table_1.user_id IS NULL
      `,
    values: [conversationId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getChannelUsers = (req, res, next) => {
  const { conversationId } = req.params;

  const query = {
    text: `
    SELECT
      slacker_users.user_id,
      slacker_users.name,
      slacker_users.image_url,
      user_conversation.conversation_id
    FROM
      slacker_users
    INNER JOIN user_conversation ON user_conversation.user_id = slacker_users.user_id
	  WHERE user_conversation.conversation_id = $1
    `,
    values: [conversationId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getConversationMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  if (!(await isAllowed(req.user.user_id, parseInt(conversationId)))) {
    return res.send(401, 'You do not have access to that channel');
  }

  const query = {
    text: `
    SELECT
      message.text,
	    message.createddate,
      message.user_id,
      slacker_users.name,
      slacker_users.image_url,
      conversation.conversation_id
    FROM
      message
	  INNER JOIN slacker_users ON slacker_users.user_id = message.user_id
    INNER JOIN conversation ON conversation.conversation_id = message.conversation_id
    WHERE message.conversation_id = $1
    ORDER BY createddate ASC;
    `,
    values: [conversationId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    return res.send(results.rows);
  });
};

const createConversationMessage = (req, res, next) => {
  const { conversationId } = req.params;
  const { text, createddate } = req.body;
  const { user_id } = req.user;

  const query = {
    text: `
    INSERT INTO message (user_id, conversation_id, text, createddate)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    values: [user_id, conversationId, text, createddate],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.send();
  });
};

const getUserChannels = (req, res, next) => {
  // eslint-disable-next-line camelcase
  const { user_id } = req.user;

  const query = {
    text: `
    SELECT
      user_conversation.conversation_id,
      conversation.name,
      conversation.description
    FROM user_conversation
    INNER JOIN slacker_users
    ON slacker_users.user_id = user_conversation.user_id
    INNER JOIN conversation
    ON conversation.conversation_id = user_conversation.conversation_id
    WHERE user_conversation.user_id = $1 AND conversation.type = $2
    `,
    // eslint-disable-next-line camelcase
    values: [user_id, 'channel'],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

const getUserDms = (req, res, next) => {
  const query = {
    text: `
    SELECT conversation_id, name, user_id
    FROM user_conversation
    NATURAL JOIN slacker_users
    WHERE conversation_id IN (SELECT 
      conversation.conversation_id
    FROM conversation NATURAL JOIN user_conversation 
    WHERE type = $2 AND user_id = $1) AND user_id != $1;
    `,
    values: [req.user.user_id, 'dm'],
  };

  pool.query(query, (error, results) => {
    if (error) {
      res.send(400, 'Request could not be processed.');
    }
    res.send(results.rows);
  });
};

const getDMUser = (req, res, next) => {
  const { conversationId } = req.params;
  const query = {
    text: `
    SELECT name
    FROM user_conversation
    NATURAL JOIN slacker_users
    WHERE conversation_id = $1 AND user_id != $2;
    `,
    values: [conversationId, req.user.user_id],
  };

  pool.query(query, (error, results) => {
    if (error) {
      res.send(400, 'Request could not be processed.');
    }
    res.send(results.rows);
  });
};

const getConversation = async (req, res, next) => {
  const { conversationId } = req.params;

  if (!(await isAllowed(req.user.user_id, parseInt(conversationId)))) {
    return res.send(401, 'You do not have access to that channel');
  }
  const query = {
    text: `
    SELECT 
      conversation_id,
      name,
      description,
      type
    FROM conversation 
    WHERE conversation_id = $1;
    `,
    values: [conversationId],
  };

  pool.query(query, (error, results) => {
    if (error) {
      res.send(400, 'Request could not be processed.');
    }
    res.send(results.rows);
  });
};
// const deleteChannelMessage = (req, res, next) => {
//   const { messageId } = req.params;

//   const query = {
//     text: `
//     DELETE FROM message
//     WHERE message_id = $1
//     `,
//     values: [messageId],
//   };

//   client.query(query, (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.send('sweet!!');
//   });
// };

const deleteChannelUser = (req, res, next) => {
  const { conversationId } = req.params;
  const { user_id } = req.user;

  const query = {
    text: `
    DELETE FROM user_conversation
    WHERE user_id = $1 AND conversation_id = $2
    `,
    values: [user_id, parseInt(conversationId)],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
};

module.exports = {
  strings,
  pool,
  getAllChannels,
  getConversationMessages,
  getChannelUsers,
  createConversationMessage,
  getUserChannels,
  getUserDms,
  addNewChannel,
  addNewDm,
  createChannelUser,
  getAllUsers,
  getNonConvoUsers,
  getConversation,
  getDMUser,
  deleteChannelUser,
};
