import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class StudentHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Student Account")),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(12),
            child: Text("Announcements", style: TextStyle(fontSize: 20)),
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
              subtitle: Text("By ${data['author']}"),
            );
          },
        );
      },
    );
  }
}
