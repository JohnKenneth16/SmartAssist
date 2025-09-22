import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TeacherHome extends StatelessWidget {
  final postCtrl = TextEditingController();

  void postAnnouncement() {
    if (postCtrl.text.isNotEmpty) {
      FirebaseFirestore.instance.collection("announcements").add({
        'message': postCtrl.text,
        'timestamp': Timestamp.now(),
        'author': 'Teacher',
      });
      postCtrl.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Teacher Account")),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(12),
            child: Row(
              children: [
                Expanded(child: TextField(controller: postCtrl, decoration: InputDecoration(hintText: "Post announcement"))),
                IconButton(onPressed: postAnnouncement, icon: Icon(Icons.send)),
              ],
            ),
          ),
          Expanded(child: AnnouncementList())
        ],
      ),
    );
  }
}

class AnnouncementList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: FirebaseFirestore.instance.collection("announcements").orderBy('timestamp', descending: true).snapshots(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return Center(child: CircularProgressIndicator());

        final docs = snapshot.data!.docs;
        return ListView.builder(
          itemCount: docs.length,
          itemBuilder: (_, index) {
            final data = docs[index];
            return ListTile(
              title: Text(data['message']),
              subtitle: Text("Posted by ${data['author']}"),
            );
          },
        );
      },
    );
  }
}
