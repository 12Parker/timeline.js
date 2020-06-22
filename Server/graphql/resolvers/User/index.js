// The User schema.
import User from "../../../Model/user";
import Data from "../../../Model/data";
import Moment from "../../../Model/moments";
const passport = require("passport");
const FormData = require("form-data");

const PassportFunctions = require("../../../../config/passportFunctions")(
  passport
);

export default {
  Query: {
    getData: () => {
      return new Promise((resolve, reject) => {
        Data.find((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    user: async (_, { args }, { req, res }) => {
      const userData = await User.findOne(args);
      const { local } = userData;
      const { password: pass, email: user } = local;
      return {
        password: pass,
        email: user,
      };
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    addUser: async (_, { password, email }, { req, res }) => {
      console.log("addUser: ", req.body);

      req = {
        body: {
          password: password,
          email: email,
        },
      };
      const { data, info } = await PassportFunctions.authenticateLocal(
        req,
        res
      );
      if (data) {
        const { local } = data;
        const { password: pass, email: user } = local;
        return {
          message: info.message,
          password: pass,
          email: user,
        };
      } else {
        return {
          message: info.message,
        };
      }
    },
    login: async (_, { password, email }, { req, res }) => {
      console.log("Login: ", req);
      req = {
        body: {
          password: password,
          email: email,
        },
      };
      const { data, info } = await PassportFunctions.localLogin(req, res);
      if (data) {
        const { local } = data;
        const { password: pass, email: user } = local;
        return {
          message: info.message,
          password: pass,
          email: user,
        };
      } else {
        return {
          message: info.message,
        };
      }
    },
    editUser: async (_, { name, email }, { req, res }) => {
      req = {
        body: {
          name: name,
          email: email,
        },
      };
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: async (_, { args }, { req, res }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    uploadImage: async (_, { file }, req, res) => {
      let data = new Data();
      let arrayData = [];
      let uploadFile = file;
      // console.log("File: ", file);
      if (uploadFile && uploadFile.constructor === Array) {
        uploadFile.forEach((element, index) => {
          data.id = index;
          data.name = element.name;
          data.message = element.data;
          // save model to database
          data.save(function (err, res) {
            if (err) return console.error(err);
          });
          data = new Data();
        });
      } else if (uploadFile) {
        data.id = 0;
        data.name = uploadFile.name;
        data.message = uploadFile.data;
        data.save(function (err, res) {
          if (err) return console.error(err);
        });
      }
      // console.log("Saving");
      // arrayData.forEach((element) => {
      //   Data.update({ name: element.name }, element);
      // });

      // return new Promise((resolve, reject) => {
      //   Data.updateMany({}, arrayData, { upsert: true }, (err, res) => {
      //     console.log("res: ", res);
      //     err ? reject(err) : resolve(res);
      //   });
      // });
    },
    updateData: async (_, { id, comment }, { req, res }) => {
      // req = {
      //   body: {
      //     id: id,
      //     comment: comment
      //   }
      // };
      // const { id, comment } = req.body;
      const query = {
        title: id,
      };
      const update = {
        comment: comment,
      };
      console.log("Update: ", query, " : ", update);
      Moment.findOneAndUpdate(
        query,
        update,
        { upsert: true, new: true, runValidators: true }, // options
        function (err, doc) {
          // callback
          if (err) {
            // handle error
          } else {
            console.log("Doc: ", doc);
            // handle document
          }
        },
        (err) => {
          if (err) return res.json({ success: false, error: err });
          console.log("success");
          return res.json({ success: true });
        }
      );
    },
    deleteData: async (_, { name }, { req, res }) => {
      console.log("Name: ", name);
      // req = {
      //   body: {
      //     name: name
      //   }
      // };
      // const { name } = req.body;

      // Data.findOneAndDelete({ name: name }, (err) => {
      //   if (err) return res.send(err);
      //   return res.json({ success: true });
      // });
    },
    updateImage: async (_, { id, data }, { req, res }) => {
      // req = {
      //   body: {
      //     id: id,
      //     data: data
      //   }
      // };
      // const { id, data } = req.body;
      const query = {
        title: id,
      };

      const update = {
        image: data,
      };
      console.log("Update Image: ", query, " : ", update);
      Moment.findOneAndUpdate(
        query,
        update,
        { upsert: true, new: true, runValidators: true }, // options
        function (err, doc) {
          // callback
          if (err) {
            // handle error
          } else {
            console.log("Doc: ", doc);
            // handle document
          }
        },
        (err) => {
          if (err) return res.json({ success: false, error: err });
          console.log("success");
          return res.json({ success: true });
        }
      );
    },
    uploadMoment: async (_, { counter, title }, { req, res }) => {
      req = {
        body: {
          counter: counter,
          title: title,
        },
      };
      let momentsToUpload = new Moment();
      let momentReq = req.body;

      console.log("Req: ", momentReq);
      if (!momentReq.id || !momentReq) {
        return res.json({
          success: false,
          error: "INVALID INPUTS",
        });
      }

      momentsToUpload.counter = momentReq.counter;
      momentsToUpload.title = momentReq.title;
      momentsToUpload.comment = "";
      momentsToUpload.image = "";
      console.log("MomentReq: ", momentsToUpload);
      momentsToUpload.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    },
    updateMoment: async (_, { counter, title }, { req, res }) => {
      req = {
        body: {
          counter: counter,
          title: title,
        },
      };
      let momentsToUpload = new Moment();
      let momentReq = req.body;
      console.log("Req: ", momentReq);
      if (!momentReq.id || !momentReq) {
        return res.json({
          success: false,
          error: "INVALID INPUTS",
        });
      }

      momentsToUpload.counter = momentReq.counter;
      momentsToUpload.title = momentReq.title;
      momentsToUpload.comment = "";
      console.log("MomentReq: ", momentsToUpload);
      momentsToUpload.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    },
    deleteMoment: async (_, { title }, { req, res }) => {
      let returnValue = {
        message: "",
        success: false,
      };
      console.log("Title: ", title);
      Moment.findOneAndDelete({ title: title }, (err) => {
        if (err) return (returnValue.message = err);
        return (returnValue.success = true);
      });
      console.log("X: ", returnValue);
      return returnValue;
    },
  },
};
